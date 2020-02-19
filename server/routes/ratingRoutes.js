import Router from 'express';

import ratingController from '../controllers/ratingController';
import { ratingValidator } from '../middlewares/statusValidation';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import isUser from '../middlewares/isUser';

const router = Router();

router.patch('/ratings/:id', isUser, ratingValidator, asyncErrorHandler(ratingController.rateAccommodation));

export default router;
