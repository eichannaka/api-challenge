import { Op } from 'sequelize';
import User from '../models/User';
import Rental from '../models/Rental';
/**
 * Calcula los minutos de penalización por devoluciones tardías.
 * Un usuario pierde 30 minutos por cada devolución que supere las 2 horas
 * en los últimos 7 días.
 */
export const calculatePenalty = async (user: User): Promise<number> => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)); // Fecha de hace 7 días

    // Obtener todos los alquileres del usuario en los últimos 7 días
    const rentalsInLast7Days = await Rental.findAll({
        where: {
            user_id: user.id,
            end_time: {
                [Op.gte]: sevenDaysAgo, 
            },
        },
    });

    let penaltyMinutes = 0;

    // Calcular las penalizaciones por devoluciones tardías dentro de los últimos 7 días
    rentalsInLast7Days.forEach(rental => {
        const totalMinutes = rental.total_minutes;

        // Si el alquiler fue devuelto después de 2 horas (120 minutos)
        if (totalMinutes > 120) {
            penaltyMinutes += 30; 
        }
    });

    return penaltyMinutes; 
};
