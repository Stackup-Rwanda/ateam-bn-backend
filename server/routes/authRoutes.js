import Router from 'express';

import AuthController from '../controllers/authController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';

const router = Router();

router.post(
  '/auth/signup',
  asyncErrorHandler(AuthController.signUp)
);

export default router;
