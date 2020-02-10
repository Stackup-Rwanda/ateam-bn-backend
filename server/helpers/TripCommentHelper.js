import models from '../models';

const { Comment } = models;
/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the comment's data
 */
class CommentsHelper {
  /**
   * Finds if a user has a trip comment.
   * @param {string} id trip id.
   * @param {string} userId userId of a comment.
   * @returns {object} The comment's data.
   */
  static async userCommentExists(id, userId) {
    const comment = await Comment.findOne({ where: { id, userId } });
    return comment;
  }

  /**
   * delete a comment.
   * @param {string} id The comment's id.
   * @returns {object} The comment's deleted data.
   */
  static async deleteComment(id) {
    const deleteCmnt = Comment.destroy({ where: { id } });
    return deleteCmnt;
  }

  /**
   * Save a comment in the DB.
   * @param {object} comment The request sent by a user.
   * @returns {object} The comment's data.
   */
  static async saveComment(comment) {
    const acceptedComment = await Comment.create(
      {
        ...comment, createdAt: new Date(), updatedAt: new Date()
      },
      {
        fields: [
          'userId', 'tripId', 'comment', 'createAt', 'updatedAt'
        ]
      }
    );
    return acceptedComment;
  }
}
export default CommentsHelper;
