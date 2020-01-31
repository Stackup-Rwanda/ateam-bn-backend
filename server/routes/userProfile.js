import { Router } from 'express';
import isProfileOwner from '../middlewares/isProfileOwner';
import validateProfile from '../middlewares/profileValidator';
import { viewProfile, editProfile } from '../controllers/profileController';

const router = Router();

router.get('/profile/:username', isProfileOwner, viewProfile);
router.patch('/profile/:username', isProfileOwner, validateProfile, editProfile);

export default router;
