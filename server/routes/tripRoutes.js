import Router from 'express';

import TripController from '../controllers/tripController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';

import { tripValidator, tripChecker } from '../middlewares/tripValidation';
import tokenValidator from "../middlewares/tokenValidator";

const router = Router();

router.post(
  '/trip/', tokenValidator, tripValidator('trip', 'body'), tripChecker,
  asyncErrorHandler(TripController.oneWayTrip)
);

export default router;
