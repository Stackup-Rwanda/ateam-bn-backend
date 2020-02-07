import models from '../models';

const { Comment } = models;
/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the comment's data
 */
class CommentsHelper {
  /**
   * Finds if a comment exists.
   * @param {string} attr comment table field.
   * @param {string} val value to be found.
   * @returns {object} The comment's data.
   */
  static async commentExists(attr, val) {
    const comment = await Comment.findOne({ where: { [attr]: val } });
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
