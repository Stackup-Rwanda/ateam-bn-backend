import { Router } from 'express';
import multiparty from 'connect-multiparty';
import isProfileOwner from '../middlewares/isProfileOwner';
import validateProfile from '../middlewares/profileValidator';
import validateProfileImage from '../middlewares/ProfileImageValidator';
import validateCoverImage from '../middlewares/coverImageValidator';
import { viewProfile, editProfile } from '../controllers/profileController';
import saveAccommodation from '../controllers/accommodationController';
import isTokenValid from '../middlewares/tokenValidator';
import isTravelAdmin from '../middlewares/isTravelAdmin';
import validateAccommodation from '../middlewares/validateAccommodations';

const router = Router();
const multipart = multiparty();

router.get('/profile/:username', isTokenValid, isProfileOwner, viewProfile);
router.patch('/profile/:username', isTokenValid, isProfileOwner, multipart, validateProfile, validateProfileImage, validateCoverImage, editProfile);
router.post('/accommodation', isTokenValid, isTravelAdmin, multipart, validateAccommodation, saveAccommodation.supply);

export default router;
