import Rental from '../models/Rental';
import Scooter from '../models/Scooter';
import User from '../models/User';
import { calculateBonus } from '../utils/bonusManager';
import { calculatePenalty } from '../utils/penaltyManager';
import { Op } from 'sequelize';

export const rentScooterService = async (dni: string, scooter_id: number, location_id: number) => {
  try {
    const user = await User.findOne({ where: { dni } });
    if (!user) throw new Error('User not found');

    // Verificar si el scooter existe
    const scooter = await Scooter.findByPk(scooter_id);
    if (!scooter) {
      throw new Error('Scooter not found');
    }
    // Verificar si el scooter está disponible
    if (!scooter.is_available) {
      throw new Error('Scooter not available');
    }

    // Verificar si hay scooters disponibles en la ubicación
    const scootersInLocation = await Scooter.count({
      where: { location_id: location_id, is_available: true },
    });
    if (scootersInLocation === 0) {
      throw new Error('No scooters available at this location');
    }
    // Verificar si el scooter está en la ubicación indicada
    if (scooter.location_id !== location_id && scootersInLocation != 0) {
      throw new Error('The scooter is not at that location');
    }


    const bonusMinutes = await calculateBonus(user);
    const penaltyMinutes = await calculatePenalty(user);
    const availableMinutes = 120 - penaltyMinutes + bonusMinutes;

    const now = new Date();
    if (availableMinutes <= 0) {
      const blockDuration = 7 * 24 * 60 * 60 * 1000; // 7 días en ms
      const blockUntil = new Date(now.getTime() + blockDuration);
      await user.update({ block_until: blockUntil });
      throw new Error('Not enough available time. User is blocked for 7 days.');
    }

    // Verificar que el usuario no tenga otro alquiler activo
    const activeRental = await Rental.findOne({
      where: { user_id: user.id, end_time: null },
    });
    if (activeRental) {
      throw new Error('User already has an active rental');
    }

    await Rental.create({
      user_id: user.id,
      scooter_id: scooter.id,
      start_time: now,
      initial_location: location_id,
    });
    if (bonusMinutes === 30) {
      await user.update({ bonus_minutes: user.bonus_minutes + 30 });
    }
    await scooter.update({ is_available: false });
    return { message: `Scooter rented successfully`, availableMinutes };
  } catch (error) {
    console.error('Error in services:', error);
    throw error;
  }
};

export const returnScooterService = async (dni: string, scooter_id: number, location_id: number) => {
  const user = await User.findOne({ where: { dni } });
  const scooter = await Scooter.findByPk(Number(scooter_id));
  const newLocation = await Scooter.findByPk(location_id);

  if (!user) {
    throw new Error('User not found');
  }
  if (!scooter) {
    throw new Error('Scooter not found for return');
  }
  if (!newLocation) {
    throw new Error('Invalid location provided');
  }

  // Verificar la disponibilidad de monopatines en la ubicación
  const rental = await Rental.findOne({
    where: {
      user_id: user.id,
      scooter_id: scooter.id,
      end_time: null,
    },
  });

  if (!rental) {
    throw new Error('No active rental found');
  }

  // Verificar que la ubicación tenga menos de 10 monopatines ocupados
  const scootersInLocation = await Scooter.count({ where: { location_id: newLocation.id, is_available: true } });

  if (scootersInLocation >= 10) {
    throw new Error('Location is full, cannot return scooter');
  }

  const currentTime = new Date();
  let totalMinutes = Math.floor((currentTime.getTime() - rental.start_time.getTime()) / 60000);

  await rental.update({ end_time: currentTime, totalMinutes });
  await rental.update({ total_minutes: totalMinutes });

  await rental.update({ final_location: newLocation.id });
  await scooter.update({ location_id: newLocation.id });
  await scooter.update({ is_available: true });


  if (totalMinutes > 120) {
    const penaltyMinutes = Math.min(totalMinutes - 120, 30);
    await user.update({ penalty_minutes: user.penalty_minutes + penaltyMinutes });
  }

  return { message: 'Scooter returned successfully', totalMinutes };
};

export const getRentalsByUserService = async (user_id: string, start_time?: string, end_time?: string) => {
  const currentDate = new Date();
  const startDate = start_time ? new Date(start_time) : new Date('2000-01-01');
  const endDate = end_time ? new Date(end_time) : currentDate;

  try {
    // Obtenemos los alquileres del usuario en el rango de fechas
    const rentals = await Rental.findAll({
      where: {
        user_id,
        start_time: {
          [Op.gte]: startDate,
        },
        end_time: {
          [Op.lte]: endDate,
        },
      },
      attributes: ['id', 'scooter_id', 'start_time', 'end_time', 'total_minutes', 'initial_location', 'final_location'],
    });

    // Sumar todos los total_minutes
    const totalMinutes = rentals.reduce((sum, rental) => sum + (rental.total_minutes || 0), 0);

    // Obtener los usuarios y sus bonus_minutes
    const users = await User.findAll({
      where: {
        id: user_id,
      },
      attributes: ['id', 'bonus_minutes'],
    });

    // Sumar todos los bonus_minutes
    const bonusMinutes = users.reduce((sum, user) => sum + (user.bonus_minutes || 0), 0);


    return { rentals, totalMinutes, bonusMinutes };
  } catch (error) {
    throw new Error('Error retrieving rentals');
  }
};