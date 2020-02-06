import Router from 'express';
import profileRoute from './userProfile';

import tripRoutes from './tripRoutes';

const router = Router();


router.use(tripRoutes);
router.use(authRoutes);
router.use(profileRoute);


export default router;
