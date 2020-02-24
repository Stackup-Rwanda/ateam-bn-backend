import Router from 'express';
import TripController from '../controllers/tripController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import rememberMeValidation from '../middlewares/rememberMeValidation';

import { tripValidator, tripChecker } from '../middlewares/tripValidation';
import tokenValidator from "../middlewares/tokenValidator";
import { checkTripId, isOwned, isEditable } from '../middlewares/tripExists';

const router = Router();

router.post(
  '/trips', tokenValidator, rememberMeValidation.IfRememberProfile, tripValidator('trip', 'body'), tripChecker,
  asyncErrorHandler(TripController.oneWayTrip)
);

router.put('/trips/:id', tokenValidator, checkTripId, isOwned, isEditable, rememberMeValidation.IfRememberProfile, tripValidator('trip', 'body'), tripChecker, asyncErrorHandler(TripController.editTrip));
router.get('/trips/:id', tokenValidator, checkTripId, TripController.viewOneTrip);
export default router;
