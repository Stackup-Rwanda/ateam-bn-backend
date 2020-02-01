import Router from 'express';

import AuthController from '../controllers/authController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
<<<<<<< HEAD
import passwordHasher from '../middlewares/passwordHashMiddleware';
=======
import storeAuth from '../controllers/fbAuthController';
>>>>>>> ft-login-via-facebook-and-google-170766085(facebook and google login test): test social logins

const router = Router();

router.post(
  '/auth/signup',
  passwordHasher,
  asyncErrorHandler(AuthController.signUp)
);

<<<<<<< HEAD
=======
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false }), googleAuth);


router.get('/auth/facebook',
  passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), storeAuth);

>>>>>>> ft-login-via-facebook-and-google-170766085(facebook and google login test): test social logins
export default router;
