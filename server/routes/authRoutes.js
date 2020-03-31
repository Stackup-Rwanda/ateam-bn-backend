import Router from 'express';
import passport from 'passport';
import AuthController from '../controllers/authController';
import EmailController from '../controllers/EmailController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import Validations from '../middlewares/ValidateResetPassword';
import resetEmailTokenMiddleware from '../middlewares/ResetEmailTokenMiddleware';
import userIdExistMiddleware from '../middlewares/UserIdExistMiddleware';
import OAuthController from '../controllers/socialController';
import { signUp, signIn, specialSignUp } from '../middlewares/authValidator';
import importedTokenValidator from '../middlewares/tokenValidator';
import searchData from '../controllers/searchController';
import isSuperManager from '../middlewares/isSuperAdmin';


const router = Router();
router.use(passport.initialize());

router
  .post('/auth/signup', signUp, passwordHasher, asyncErrorHandler(AuthController.signUp))
  .post('/auth/admin/signup', importedTokenValidator, isSuperManager, specialSignUp, passwordHasher, asyncErrorHandler(AuthController.adminSignUp))
  .post('/auth/reset-password', Validations.checkEmail, asyncErrorHandler(EmailController.sendResetPasswordEmail))
  .patch('/auth/update-password/:userId/:token', Validations.checkPassword, Validations.checkPasswordAnConfirmPassword, userIdExistMiddleware, resetEmailTokenMiddleware, asyncErrorHandler(EmailController.updatePassword))
  .get('/user/:email/confirm', AuthController.confirmation)
  .post('/auth/signin', signIn, asyncErrorHandler(AuthController.signIn))
  .post('/auth/logout', importedTokenValidator, AuthController.logout)
  .get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
  .get('/auth/google/callback', passport.authenticate('google', { session: false }), asyncErrorHandler(OAuthController.storeAuth))
  .get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }))
  .get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), asyncErrorHandler(OAuthController.storeAuth))
  .post('/search/request', importedTokenValidator, asyncErrorHandler(searchData));

export default router;
