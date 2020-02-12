import tripHelpers from '../helpers/tripHelpers';
import commentHelper from '../helpers/TripCommentHelper';
import checkIdParams from '../helpers/CheckParams';

/**
 * This class contains all methods
 * required to handle
 * comment endpoints' request.
 */
class TripCommentController {
  /**
   * This method create on a trip request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the comment.
   */
  static async saveComment(req, res) {
    if (!checkIdParams(req.params.tripId)) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Sorry, The URL request contains bad data',
      });
    }

    req.body.userId = req.user.id;
    req.body.tripId = req.params.tripId;

    const tripExists = await tripHelpers.userTripExists(req.params.tripId, req.user.id);
    if (!tripExists) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry, This trip does not exist.'
      });
    }

    const savedComment = await commentHelper.saveComment(req.body);

    return res.status(201).json({
      status: res.statusCode,
      message: 'Comment has created successfully',
      data: savedComment
    });
  }

  /**
   * This method create on a trip request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the comment.
   */
  static async deleteComment(req, res) {
    if (!checkIdParams(req.params.tripId) || !checkIdParams(req.params.commentId)) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Sorry, The request contains bad data',
      });
    }

    const tripExists = await tripHelpers.userTripExists(req.params.tripId, req.user.id);
    const commentExist = await commentHelper.userCommentExists(req.params.commentId, req.user.id);
    if (!tripExists) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry, This trip does not exist.'
      });
    }
    if (!commentExist) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry, This comment does not exist.'
      });
    }

    await commentHelper.deleteComment(req.params.commentId);

    return res.status(200).json({
      status: res.statusCode,
      message: 'Comment has deleted successfully.',
      data: commentExist
    });
  }
}

export default TripCommentController;
