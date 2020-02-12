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
   * This method create a trip comment request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the comment.
   */
  static async saveComment(req, res) {
    if (!checkIdParams(req.params.tripId)) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Sorry, The request contains bad data',
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
      message: 'Comment has been created successfully',
      data: savedComment
    });
  }

  /**
   * This method retrieve all trip comment.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the comment.
   */
  static async getUserTripComments(req, res) {
    if (!checkIdParams(req.params.tripId)) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Sorry, The request contains bad data',
      });
    }

    const tripCommentsExists = await commentHelper.userTripComments(req.params.tripId, req.user.id);
    if (!tripCommentsExists.length) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry, This trip does not have any comment.'
      });
    }

    return res.status(200).json({
      status: res.statusCode,
      message: 'Trip comments has been found successfully',
      data: tripCommentsExists
    });
  }

  /**
   * This method update a trip comment.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of an updated comment.
   */
  static async updateComment(req, res) {
    if (!checkIdParams(req.params.commentId)) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Sorry, The request contains bad data',
      });
    }

    const commentExist = await commentHelper.userCommentExists(req.params.commentId, req.user.id);
    if (!commentExist) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry, This comment does not exist.'
      });
    }

    await commentHelper.updateComment(req.params.commentId, req.body);

    return res.status(200).json({
      status: res.statusCode,
      message: 'Comment has been updated successfully.',
      data: {
        id: commentExist.id,
        tripId: commentExist.tripId,
        comment: req.body.comment
      }
    });
  }

  /**
   * This method delete a trip comment.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of deleted comment.
   */
  static async deleteComment(req, res) {
    if (!checkIdParams(req.params.commentId)) {
      return res.status(400).json({
        status: res.statusCode,
        error: 'Sorry, The request contains bad data',
      });
    }

    const commentExist = await commentHelper.userCommentExists(req.params.commentId, req.user.id);
    if (!commentExist) {
      return res.status(404).json({
        status: res.statusCode,
        error: 'Sorry, This comment does not exist.'
      });
    }

    await commentHelper.deleteComment(req.params.commentId);

    return res.status(200).json({
      status: res.statusCode,
      message: 'Comment has been deleted successfully.',
      data: commentExist
    });
  }
}

export default TripCommentController;
