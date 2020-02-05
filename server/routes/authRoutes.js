import Router from 'express';
import passport from 'passport';
import AuthController from '../controllers/authController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import social from '../controllers/socialController';

const router = Router();
router.use(passport.initialize());
router.post(
  '/auth/signup',
  asyncErrorHandler(AuthController.signUp)
);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }), social.googleAuth
);


router.get(
  '/auth/facebook',
  passport.authenticate('facebook')
);
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), social.storeAuth);

export default router;
