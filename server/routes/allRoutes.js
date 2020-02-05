import Router from 'express';


import authRoutes from './authRoutes';
import tripRoutes from './tripRoutes';

const router = Router();

router.use(authRoutes);
router.use(tripRoutes);

export default router;
