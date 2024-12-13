import { Op } from 'sequelize';
import User from '../models/User';
import Rental from '../models/Rental';

/**
 * Calcula el bono de minutos adicionales para el usuario.
 * Un usuario recibe 30 minutos adicionales cada 2 alquileres realizados
 * en los últimos 7 días.
 */

export const calculateBonus = async (user: User): Promise<number> => {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  let rentalsInLast7Days = await Rental.count({
    where: {
      user_id: user.id,
      start_time: {
        [Op.between]: [sevenDaysAgo, now],
      },
    },
  });

  rentalsInLast7Days += 1;
  // Otorga 30 minutos adicionales por cada 2 alquileres en los últimos 7 días
  if (rentalsInLast7Days >= 2 && rentalsInLast7Days % 2 === 0) {
    return 30;
  }
  return 0;
};

