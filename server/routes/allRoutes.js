import Router from 'express';
import profileRoute from './userProfile';

import authRoutes from './authRoutes';
import roleRoutes from './userRoleRoutes';

const router = Router();

router.use(authRoutes);
router.use(profileRoute);
router.use(roleRoutes);

export default router;
