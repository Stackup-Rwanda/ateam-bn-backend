import { Router } from 'express';
import connect from 'connect-multiparty';
import isProfileOwner from '../middlewares/isProfileOwner';
import validateProfile from '../middlewares/profileValidator';
import { viewProfile, editProfile } from '../controllers/profileController';
import saveAccommodation from '../controllers/accommodationController';
import isTokenValid from '../middlewares/tokenValidator';
import isTravelAdmin from '../middlewares/isTravelAdmin';
import validateAccommodation from '../middlewares/validateAccommodations';

const router = Router();
const connection = connect();

router.get('/profile/:username', isProfileOwner, viewProfile);
router.patch('/profile/:username', isProfileOwner, validateProfile, editProfile);
router.post('/accommodation', isTokenValid, isTravelAdmin, connection, validateAccommodation, saveAccommodation.supply);
export default router;
