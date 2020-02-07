import tripHelpers from '../helpers/tripHelpers';
import commentHelper from '../helpers/CommentsHelper';

/**
 * This class contains all methods
 * required to handle
 * comment endpoints' request.
 */
class TripController {
  /**
   * This method create on a trip request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the comment.
   */
  static async saveComment(req, res) {
    const tripExists = await tripHelpers.tripExists('id', req.params.tripId);
    if (tripExists) {
      return res.status(409).json({
        status: res.statusCode,
        error: 'This trip already exists, use another reasons or date'
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
    const commentExist = await commentHelper.commentExists('id', req.params.commentId);
    if (commentExist) {
      return res.status(409).json({
        status: res.statusCode,
        error: 'This trip already exists, use another reasons or date'
      });
    }

    const deletedComment = await commentHelper.deleteComment(req.params.commentId);

    return res.status(200).json({
      status: res.statusCode,
      message: 'Comment has created successfully',
      data: deletedComment
    });
  }
}

export default TripController;
