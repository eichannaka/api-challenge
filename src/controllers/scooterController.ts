import { Request, Response } from 'express';
import { getScootersByLocation, getAllLocations } from '../services/scooterService';

export const listLocations = async (req: Request, res: Response) => {
  try {
    const locations = await getAllLocations();
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};

export const listScootersForLocation = async (req: Request, res: Response) => {
  const { locationId } = req.params;
  try {
    const scooters = await getScootersByLocation(Number(locationId));
    res.json(scooters);
  } catch (error) {
    console.error("Error fetching scooter data:", error);
    res.status(500).json({ message: 'Error fetching scooter data', error });
  }
};
