import Router from 'express';
import TripCommentController from '../controllers/TripCommentController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import TripCommentValidator from '../middlewares/TripCommentValidator';
import tokenValidator from '../middlewares/tokenValidator';

const router = Router();

router
  .post(
    '/Trips/:tripId/Comment',
    tokenValidator,
    TripCommentValidator.newComment,
    asyncErrorHandler(TripCommentController.saveComment)
  )

  .delete(
    '/Trips/:tripId/Comments/:commentId/delete',
    tokenValidator,
    asyncErrorHandler(TripCommentController.deleteComment)
  );

export default router;
