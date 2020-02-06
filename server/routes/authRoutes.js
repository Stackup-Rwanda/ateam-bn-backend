import Router from 'express';
import passport from 'passport';
import AuthController from '../controllers/authController';
import EmailController from '../controllers/EmailController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import social from '../controllers/socialController';
<<<<<<< HEAD
import passwordHasher from '../middlewares/passwordHashMiddleware';
=======
import Validations from '../middlewares/ValidateResetPassword';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import resetEmailTokenMiddleware from '../middlewares/ResetEmailTokenMiddleware';
import userIdExistMiddleware from '../middlewares/UserIdExistMiddleware';
>>>>>>> 9742064ae7f31b5b5cd1b46fd5f9db2fef272d09
import signUp from '../middlewares/validation';


const router = Router();
router.use(passport.initialize());
router.post(
  '/auth/signup', signUp,
  passwordHasher,
  asyncErrorHandler(AuthController.signUp)
);

router.post(
  '/auth/reset-password',
  Validations.checkEmail,
  asyncErrorHandler(EmailController.sendResetPasswordEmail)
);

router.patch(
  '/auth/update-password/:userId/:token',
  Validations.checkPassword,
  Validations.checkPasswordAnConfirmPassword,
  userIdExistMiddleware,
  resetEmailTokenMiddleware,
  asyncErrorHandler(EmailController.updatePassword)
);

router.put('/user/:email/confirm', AuthController.confirmation);

router.post('/auth/signin', asyncErrorHandler(AuthController.signIn));

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
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
