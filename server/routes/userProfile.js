import { Router } from 'express';
import multiparty from 'connect-multiparty';
import isProfileOwner from '../middlewares/isProfileOwner';
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

const router = Router();
const multipart = multiparty();

router.get('/profile/:username', isTokenValid, isProfileOwner, viewProfile);
router.patch('/profile/:username', isTokenValid, isProfileOwner, multipart, validateProfile, validateProfileImage, validateCoverImage, editProfile);
router.post('/accommodation', isTokenValid, isTravelAdmin, multipart, validateAccommodation, saveAccommodation.supply);
router.post('/profile/rememberMe/:state', isTokenValid, rememberMeValidation.rememberMe, asyncErrorHandler(rememberProfile));
export default router;
