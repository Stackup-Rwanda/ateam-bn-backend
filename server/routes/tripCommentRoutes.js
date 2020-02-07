import Router from 'express';
import CommentController from '../controllers/CommentController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import CommentValidator from '../middlewares/CommentValidator';
import tokenValidator from '../middlewares/tokenValidator';

const router = Router();

router.post(
  '/Trips/:tripId/Comment',
  tokenValidator,
  CommentValidator.NewComment,
  asyncErrorHandler(CommentController.saveComment)
);

router.delete(
  '/Trips/:tripId/Comments/:commentId/delete',
  tokenValidator,
  asyncErrorHandler(CommentController.deleteComment)
);

export default router;
