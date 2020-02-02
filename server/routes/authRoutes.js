import Router from 'express';
import passport from 'passport';
import googleAuth from '../controllers/googleAuthController';
import AuthController from '../controllers/authController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import storeAuth from '../controllers/fbAuthController';

const router = Router();
router.use(passport.initialize());
router.post(
  '/auth/signup',
  asyncErrorHandler(AuthController.signUp)
);

router.get(
  '/auth/google',
  passport.authenticate( 'google', { scope: [ 'profile' ] } )
);
router.get(
  '/auth/google/callback',
  passport.authenticate( 'google', { session: false } ), googleAuth
);


router.get(
  '/auth/facebook',
  passport.authenticate( 'facebook' )
);
router.get(
  '/auth/facebook/callback', passport.authenticate( 'facebook', { session: false } ), storeAuth
);

export default router;
