import Router from 'express';
import travelProfileMiddleware from '../middlewares/travelProfileMiddleware';

import TripController from '../controllers/tripController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';

import { tripValidator, tripChecker } from '../middlewares/tripValidation';
import tokenValidator from "../middlewares/tokenValidator";

const router = Router();

router.post(
  '/Trip/One-Way', tokenValidator, tripValidator('trip', 'body'), tripChecker, travelProfileMiddleware,
  asyncErrorHandler(TripController.oneWayTrip)
);

export default router;
