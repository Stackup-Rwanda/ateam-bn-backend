import Router from 'express';
import profileRoute from './userProfile';

import authRoutes from './authRoutes';

const router = Router();

router.use(authRoutes);
router.use(profileRoute);

export default router;
