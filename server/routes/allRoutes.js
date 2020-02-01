import Router from 'express';
import profileRoute from './userProfile';

import tripRoutes from './tripRoutes';
import authRoutes from './authRoutes';

const router = Router();


router.use(tripRoutes);
router.use(authRoutes);
router.use(profileRoute);


export default router;
