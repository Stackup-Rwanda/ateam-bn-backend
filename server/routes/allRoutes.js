import Router from 'express';
import profileRoute from './userProfile';

import tripRoutes from './tripRoutes';
import authRoutes from './authRoutes';
import tripCommentRoutes from './tripCommentRoutes';

const router = Router();


router.use(tripRoutes);
router.use(authRoutes);
router.use(profileRoute);
router.use(tripCommentRoutes);


export default router;
