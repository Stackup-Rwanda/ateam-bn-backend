import Router from 'express';
import profileRoute from './userProfile';

import authRoutes from './authRoutes';
import requestRoutes from './requestRoutes';

const router = Router();

router.use(authRoutes);
router.use(profileRoute);
router.use(requestRoutes);

export default router;
