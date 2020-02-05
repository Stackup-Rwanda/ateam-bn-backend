import Router from 'express';

<<<<<<< HEAD
=======

import authRoutes from './authRoutes';
>>>>>>> ea7e5b575277fc969c9e4f74b497d4137654227c
import tripRoutes from './tripRoutes';

const router = Router();

<<<<<<< HEAD
=======
router.use(authRoutes);
>>>>>>> ea7e5b575277fc969c9e4f74b497d4137654227c
router.use(tripRoutes);

export default router;
