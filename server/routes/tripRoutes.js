import Router from 'express';

import TripController from '../controllers/tripController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';

const router = Router();

router.post(
  '/Trip/One-Way',
  asyncErrorHandler(TripController.oneWayTrip)
);

export default router;
