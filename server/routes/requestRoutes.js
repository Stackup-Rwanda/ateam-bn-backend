import Router from 'express';

import isManager from '../middlewares/isManager';
import requestController from '../controllers/requestController';
import { approveValidator, rejectValidator } from '../middlewares/statusValidation';

const router = Router();

router.patch('/request/:id/approve', isManager, approveValidator, requestController.approveRequest);
router.patch('/request/:id/reject', isManager, rejectValidator, requestController.rejectRequest);

export default router;
