import Router from 'express';
import profileRoute from './userProfile';
import tripRoutes from './tripRoutes';
import authRoutes from './authRoutes';
import roleRoutes from './userRoleRoutes';
import requestRoutes from './requestRoutes';
import notificationRoute from './notificationRoute';
import tripCommentRoutes from './tripCommentRoutes';
import locationRoute from './locationRoute';
import ratingRoutes from './ratingRoutes';

const router = Router();

router.use(tripRoutes);
router.use(authRoutes);
router.use(profileRoute);
router.use(roleRoutes);
router.use(requestRoutes);
router.use(notificationRoute);
router.use(tripCommentRoutes);
router.use(locationRoute);
router.use(ratingRoutes);

export default router;
