import Router from 'express';
import profileRoute from './userProfile';
import tripRoutes from './tripRoutes';
import authRoutes from './authRoutes';
import notificationRoute from './notificationRoute';
import roleRoutes from './userRoleRoutes';

const router = Router();


router.use(tripRoutes);
router.use(authRoutes);
router.use(profileRoute);
router.use(notificationRoute);
router.use(roleRoutes);


export default router;
