import Router from 'express';
import authRoutes from './authRoutes';
import profileRoute from './userProfile';
import notificationRoute from './notificationRoute';

const router = Router();

router.use(authRoutes);
router.use(profileRoute);
router.use(notificationRoute);

export default router;
