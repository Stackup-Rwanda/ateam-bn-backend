import Router from 'express';

import TripController from '../controllers/tripController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';

import tripValidator from '../middlewares/tripValidation';

const router = Router();

router.post(
  '/Trip/One-Way', tripValidator('trip', 'body'),
  asyncErrorHandler(TripController.oneWayTrip)
);

export default router;
