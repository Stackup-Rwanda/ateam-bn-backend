import Router from 'express';
import profileRoute from './userProfile';

import tripRoutes from './tripRoutes';
import authRoutes from './authRoutes';
import roleRoutes from './userRoleRoutes';
import requestRoutes from './requestRoutes';

const router = Router();


router.use(tripRoutes);
router.use(authRoutes);
router.use(profileRoute);
router.use(roleRoutes);
router.use(requestRoutes);
router.use(roleRoutes);


export default router;
