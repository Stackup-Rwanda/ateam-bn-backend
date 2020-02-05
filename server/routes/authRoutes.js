import Router from 'express';
import AuthController from '../controllers/authController';
import EmailController from '../controllers/EmailController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import Validations from '../middlewares/ValidateResetPassword';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import resetEmailTokenMiddleware from '../middlewares/ResetEmailTokenMiddleware';
import userIdExistMiddleware from '../middlewares/UserIdExistMiddleware';
import signUp from '../middlewares/validation';

const router = Router();

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

export default router;
