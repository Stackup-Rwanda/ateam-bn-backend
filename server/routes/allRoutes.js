import Router from 'express';
import authRoutes from './authRoutes';
import profileRoute from './userProfile';
import notificationRoute from './notificationRoute';
import roleRoutes from './userRoleRoutes';

const router = Router();

router.use(authRoutes);
router.use(profileRoute);
router.use(notificationRoute);
router.use(roleRoutes);

export default router;
