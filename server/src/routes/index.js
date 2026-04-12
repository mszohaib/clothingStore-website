import { Router } from 'express';
import productsRoutes from './products.routes.js';
import ordersRoutes from './orders.routes.js';
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, service: 'railframe-api' });
});

router.use('/products', productsRoutes);
router.use('/orders', ordersRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
