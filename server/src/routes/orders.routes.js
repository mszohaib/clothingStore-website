import { Router } from 'express';
import * as ordersController from '../controllers/ordersController.js';
import { optionalAuth } from '../middleware/optionalAuth.js';

const router = Router();

router.post('/', optionalAuth, ordersController.create);

export default router;
