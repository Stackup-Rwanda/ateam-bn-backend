import Router from 'express';
import TripController from '../controllers/tripController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import rememberMeValidation from '../middlewares/rememberMeValidation';
import { tripValidator, tripChecker } from '../middlewares/tripValidation';
import tokenValidator from "../middlewares/tokenValidator";
import { checkTripId, isOwned, isEditable } from '../middlewares/tripExists';
import checkRememberFields from '../middlewares/checkRememberFields';
import checkRequester from '../middlewares/isRequester';

const router = Router();

router.post(
  '/trips', tokenValidator, checkRequester, rememberMeValidation.IfRememberProfile, tripValidator('trip', 'body'), tripChecker,
  asyncErrorHandler(TripController.oneWayTrip)
);

router.get('/trips/:id', tokenValidator, checkTripId, TripController.viewOneTrip);
router.put('/trips/:id', tokenValidator, checkTripId, isOwned, isEditable, checkRememberFields, rememberMeValidation.IfRememberProfile, tripValidator('trip', 'body'), tripChecker, asyncErrorHandler(TripController.editTrip));
router.get('/trips', tokenValidator, TripController.viewAllTrips);

export default router;
