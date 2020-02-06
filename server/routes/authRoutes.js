import Router from 'express';
import AuthController from '../controllers/authController';
import EmailController from '../controllers/EmailController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import Validations from '../middlewares/ValidateResetPassword';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import resetEmailTokenMiddleware from '../middlewares/ResetEmailTokenMiddleware';
import userIdExistMiddleware from '../middlewares/UserIdExistMiddleware';
import { signUp, signIn } from '../middlewares/validation';
import importedTokenValidator from '../middlewares/tokenValidator';

const router = Router();

router
  .post('/auth/signup', signUp, passwordHasher, asyncErrorHandler(AuthController.signUp))
  .post('/auth/reset-password', Validations.checkEmail, asyncErrorHandler(EmailController.sendResetPasswordEmail))
  .patch('/auth/update-password/:userId/:token', Validations.checkPassword, Validations.checkPasswordAnConfirmPassword, userIdExistMiddleware, resetEmailTokenMiddleware, asyncErrorHandler(EmailController.updatePassword))
  .put('/user/:email/confirm', AuthController.confirmation)
  .post('/auth/signin', signIn, asyncErrorHandler(AuthController.signIn))
  .get('/users/logout', importedTokenValidator, AuthController.logout);

router.get('/users/logout', importedTokenValidator, AuthController.logout);

export default router;
