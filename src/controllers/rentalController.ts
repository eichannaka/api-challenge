import { Request, Response } from 'express';
import { rentScooterService, returnScooterService, getRentalsByUserService } from '../services/rentalService';

export const rentScooter = async (req: Request, res: Response) => {
  try {
    const { dni, scooter_id, location_id } = req.body;

    if (!dni) {
      res.status(400).json({ error: 'DNI is required' });
      return;
    }

    const result = await rentScooterService(dni, scooter_id, location_id);
    res.status(200).json(result);
  } catch (error: any) {
    switch (error.message) {
      case 'User not found':
        res.status(404).json({ error: error.message });
        break;
      case 'Scooter not found':
        res.status(404).json({ error: error.message });
        break;
      case 'Scooter not available':
        res.status(400).json({ error: error.message });
        break;
      case 'Not enough available time':
        res.status(400).json({ error: error.message });
        break;
      case 'User already has an active rental':
        res.status(400).json({ error: error.message });
        break;
      case 'User is temporarily blocked from renting scooters':
        res.status(400).json({ error: error.message });
        break;
      case 'Not enough available time. User is blocked for 7 days.':
        res.status(400).json({ error: error.message });
        break;
      case 'Scooter not found for return':
        res.status(400).json({ error: error.message });
        break;
      case 'No scooters available at this location':
        res.status(400).json({ error: error.message });
        break;
      case 'Location is full, cannot return scooter':
        res.status(400).json({ error: error.message });
        break;
      case 'The scooter is not at that location':
        res.status(400).json({ error: error.message });
        break;
      default:
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const returnScooter = async (req: Request, res: Response) => {

  try {
    const { dni, scooter_id, location_id } = req.body;
    const result = await returnScooterService(dni, scooter_id, location_id);
    res.json(result);
  } catch (error: any) {
    switch (error.message) {
      case 'User not found':
        res.status(404).json({ error: error.message });
        break;
      case 'Scooter not found for return':
        res.status(404).json({ error: error.message });
        break;
      case 'Invalid location provided':
        res.status(404).json({ error: error.message });
        break;
      case 'No active rental found':
        res.status(404).json({ error: error.message });
        break;
      case 'Location is full, cannot return scooter':
        res.status(400).json({ error: error.message });
        break;
      default:
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const getRentalsByUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { start_time, end_time } = req.query;

  try {
    const result = await getRentalsByUserService(id, start_time as string, end_time as string);
    res.json(result);
  } catch (error) {
    console.error("Error fetching rentals data:", error);
    res.status(500).json({ message: 'Error fetching rentals data', error });
  }
};
