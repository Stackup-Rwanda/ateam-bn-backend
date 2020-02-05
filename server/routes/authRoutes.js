import Router from 'express';
import AuthController from '../controllers/authController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import passwordHasher from '../middlewares/passwordHashMiddleware';
import signUp from '../middlewares/validation';

const router = Router();

router.post(
  '/auth/signup', signUp,
  passwordHasher,
  asyncErrorHandler(AuthController.signUp)
);
router.put('/user/:email/confirm', AuthController.confirmation);

router.post('/auth/signin', asyncErrorHandler(AuthController.signIn));

export default router;
