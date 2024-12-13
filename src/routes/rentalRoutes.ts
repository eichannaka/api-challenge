import { Router } from 'express';
import { rentScooter, returnScooter , getRentalsByUser} from '../controllers/rentalController';

const router = Router();

router.post('/rent', rentScooter);
router.post('/return', returnScooter);
router.get('/:id', getRentalsByUser);

export default router;
