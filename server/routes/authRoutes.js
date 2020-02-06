import Router from 'express';
import passport from 'passport';
import AuthController from '../controllers/authController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import social from '../controllers/socialController';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import signUp from '../middlewares/validation';


const router = Router();
router.use(passport.initialize());
router.post(
  '/auth/signup', signUp,
  passwordHasher,
  asyncErrorHandler(AuthController.signUp)
);
router.put('/user/:email/confirm', AuthController.confirmation);

router.post('/auth/signin', asyncErrorHandler(AuthController.signIn));

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
