import { Router } from 'express'; 
import { listScootersForLocation, listLocations } from '../controllers/scooterController';

const router = Router();

router.get('/locations', listLocations);
router.get('/locations/:locationId', listScootersForLocation);

export default router;
