import { Router } from 'express';
import multiparty from 'connect-multiparty';
import isProfileOwner from '../middlewares/isProfileOwner';
import validateProfile from '../middlewares/profileValidator';
import validateProfileImage from '../middlewares/ProfileImageValidator';
import validateCoverImage from '../middlewares/coverImageValidator';
import { viewProfile, editProfile, rememberProfile } from '../controllers/profileController';
import accommodation from '../controllers/accommodationController';
import isTokenValid from '../middlewares/tokenValidator';
import isTravelAdmin from '../middlewares/isTravelAdmin';
import validateAccommodation from '../middlewares/validateAccommodations';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import rememberMeValidation from '../middlewares/rememberMeValidation';
import feedbackMiddleware from '../middlewares/feedbackMiddleware';

const router = Router();
const multipart = multiparty();

router.get('/profile/:username', isTokenValid, isProfileOwner, viewProfile);
router.patch('/profile/:username', isTokenValid, isProfileOwner, multipart, validateProfile, validateProfileImage, validateCoverImage, editProfile);
router.post('/accommodation', isTokenValid, isTravelAdmin, multipart, validateAccommodation, accommodation.supply);
router.post('/profile/rememberMe/:state', isTokenValid, rememberMeValidation.rememberMe, asyncErrorHandler(rememberProfile));
router.post('/accommodation/feedback/:accommodationId', isTokenValid, feedbackMiddleware.validateParams, feedbackMiddleware.allowFeedback, accommodation.giveFeedBack);
export default router;
