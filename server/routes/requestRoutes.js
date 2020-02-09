import Router from 'express';

import isManager from '../middlewares/isManager';
import requestController from '../controllers/requestController';
import statusValidator from '../middlewares/statusValidation';

const router = Router();

router.patch('/request/:id/approve', isManager, statusValidator, requestController.approveRequest);

export default router;
