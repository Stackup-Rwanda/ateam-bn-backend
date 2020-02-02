import Router from 'express';

import tripRoutes from './tripRoutes';

const router = Router();

router.use(tripRoutes);

export default router;
