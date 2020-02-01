import Router from 'express';

import AuthController from '../controllers/authController';
import EmailController from '../controllers/EmailController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import Validations from '../middleware/ValidateResetPassword';

const router = Router();

router.post(
  '/auth/signup',
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
  asyncErrorHandler(EmailController.updatePassword)
);

export default router;
