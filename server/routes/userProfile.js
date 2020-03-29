import { Router } from 'express';
import multiparty from 'connect-multiparty';
import validateProfile from '../middlewares/profileValidator';
import validateProfileImage from '../middlewares/ProfileImageValidator';
import validateCoverImage from '../middlewares/coverImageValidator';
import { viewProfile, editProfile, rememberProfile } from '../controllers/profileController';
import saveAccommodation from '../controllers/accommodationController';
import isTokenValid from '../middlewares/tokenValidator';
import isTravelAdmin from '../middlewares/isTravelAdmin';
import validateAccommodation from '../middlewares/validateAccommodations';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import rememberMeValidation from '../middlewares/rememberMeValidation';
import accommMiddleware from '../middlewares/accommodationMiddleware';
import validateReaction from '../middlewares/reactionvalidation';

const router = Router();
const multipart = multiparty();

router.get('/profile', isTokenValid, viewProfile);
router.patch(
  '/profile',
  isTokenValid,
  multipart,
  validateProfile,
  validateProfileImage,
  validateCoverImage,
  editProfile
);
router.post(
  '/accommodation',
  isTokenValid,
  isTravelAdmin,
  multipart,
  validateAccommodation,
  saveAccommodation.supply
);
router.post('/accommodation/feedback/:accommodationId', isTokenValid, accommMiddleware.validateParams, accommMiddleware.validateAccommodationId, accommMiddleware.allowFeedback, saveAccommodation.giveFeedBack);
router.post('/accomodation/react/:accommodationId', isTokenValid, validateReaction, accommMiddleware.validateParams, accommMiddleware.validateAccommodationId, asyncErrorHandler(saveAccommodation.createReaction));
router.post(
  '/profile/rememberMe/:state',
  isTokenValid,
  rememberMeValidation.rememberMe,
  asyncErrorHandler(rememberProfile)
);
export default router;
