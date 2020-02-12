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

  .get(
    '/Trips/:tripId/Comments',
    tokenValidator,
    asyncErrorHandler(TripCommentController.getUserTripComments)
  )

  .patch(
    '/Comments/:commentId/update',
    tokenValidator,
    TripCommentValidator.newComment,
    asyncErrorHandler(TripCommentController.updateComment)
  )

  .delete(
    '/Comments/:commentId/delete',
    tokenValidator,
    asyncErrorHandler(TripCommentController.deleteComment)
  );

export default router;
