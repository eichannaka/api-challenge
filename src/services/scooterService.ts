import Location from '../models/Location';
import Scooter from '../models/Scooter';

// Obtener las 6 locaciones disponibles
export const getAllLocations = async () => {
  const locations = await Location.findAll({
    attributes: ['id', 'name', 'address'], 
  });

  return locations;
};

// Obtener los scooters disponibles en una locación específica
export const getScootersByLocation = async (locationId: number) => {
  const scooters = await Scooter.findAll({
    where: {
      location_id: locationId,
      is_available: true, 
    },
    attributes: ['id', 'identifier'],
  });

  return scooters;
};
