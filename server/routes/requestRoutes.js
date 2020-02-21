import Router from 'express';
import isManager from '../middlewares/isManager';
import requestController from '../controllers/requestController';
import { approveValidator, rejectValidator } from '../middlewares/statusValidation';
import asyncErrorHandler from '../helpers/asyncErrorHandler';

const router = Router();

router.patch('/request/:id/approve', isManager, approveValidator, asyncErrorHandler(requestController.approveRequest));
router.patch('/request/:id/reject', isManager, rejectValidator, asyncErrorHandler(requestController.rejectRequest));

export default router;
