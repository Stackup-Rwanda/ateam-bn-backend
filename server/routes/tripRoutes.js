import Router from 'express';
import paginate from '../middlewares/paginateMiddleware';
import TripController from '../controllers/tripController';
import tokenValidator from "../middlewares/tokenValidator";
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import checkRememberFields from '../middlewares/checkRememberFields';
import rememberMeValidation from '../middlewares/rememberMeValidation';
import { tripValidator, tripChecker } from '../middlewares/tripValidation';
import { checkTripId, isOwned, isEditable } from '../middlewares/tripExists';
import checkRequester from '../middlewares/isRequester';

const router = Router();

router.post(
  '/trips', tokenValidator, checkRequester, rememberMeValidation.IfRememberProfile, tripValidator('trip', 'body'), tripChecker,
  asyncErrorHandler(TripController.oneWayTrip)
);

router.get('/trips/:id', tokenValidator, checkTripId, TripController.viewOneTrip);
router.put('/trips/:id', tokenValidator, checkTripId, isOwned, isEditable, checkRememberFields, rememberMeValidation.IfRememberProfile, tripValidator('trip', 'body'), tripChecker, asyncErrorHandler(TripController.editTrip));
router.get('/trips', tokenValidator, TripController.viewAllTrips, paginate.paginatedRetrievedData);

export default router;
