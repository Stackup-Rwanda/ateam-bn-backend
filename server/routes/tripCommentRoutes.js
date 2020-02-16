import Router from 'express';
import TripCommentController from '../controllers/TripCommentController';
import asyncErrorHandler from '../helpers/asyncErrorHandler';
import TripCommentValidator from '../middlewares/TripCommentValidator';
import tokenValidator from '../middlewares/tokenValidator';

const router = Router();

router
  .post(
    '/trips/:tripId/comment',
    tokenValidator,
    TripCommentValidator.newComment,
    asyncErrorHandler(TripCommentController.saveComment)
  )

  .get(
    '/trips/:tripId/comments',
    tokenValidator,
    asyncErrorHandler(TripCommentController.getUserTripComments)
  )

  .patch(
    '/comments/:commentId/update',
    tokenValidator,
    TripCommentValidator.newComment,
    asyncErrorHandler(TripCommentController.updateComment)
  )

  .delete(
    '/comments/:commentId/delete',
    tokenValidator,
    asyncErrorHandler(TripCommentController.deleteComment)
  );

export default router;
