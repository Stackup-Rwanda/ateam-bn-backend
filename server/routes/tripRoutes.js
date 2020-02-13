import Router from 'express';

import TripController from '../controllers/tripController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';

import tripValidator from '../middlewares/tripValidation';
import tokenValidator from '../middlewares/tokenValidator';

const router = Router();

router.post(
  '/trip/', tripValidator('trip', 'body'),
  tokenValidator,
  asyncErrorHandler(TripController.oneWayTrip)
);

export default router;
