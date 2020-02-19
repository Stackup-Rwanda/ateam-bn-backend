import models from '../models';

const { User, Trip, Comment } = models;
/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the comment's data
 */
class CommentsHelper {
  /**
   * Finds if a user has a trip comment.
   * @param {string} id trip id.
   * @param {string} userId userId.
   * @returns {object} The comment's data.
   */
  static async userCommentExists(id, userId) {
    const comment = await Comment.findOne({ where: { id, userId } });
    return comment;
  }

  /**
   * Finds if a user has a trip comment.
   * @param {string} tripId trip id.
   * @param {string} id userId.
   * @param {string} role user role.
   * @returns {object} The comment's data.
   */
  static async tripComments(tripId, { id, role }) {
    const trip = await Trip.findOne({
      where: { id: tripId },
      include: [
        {
          model: User,
          as: 'Users',
          attributes: ['id', 'role', 'lineManager'],
        },
        {
          model: Comment,
          as: 'Comments',
          attributes: ['userId', 'comment', 'createdAt', 'updatedAt'],
        }
      ]
    });

    if (!trip) return trip;

    const { lineManager } = trip.Users;
    const userId = trip.Users.id;
    if ((userId === id) || (role === 'Manager' && lineManager === id)) return trip.Comments;

    return 'Forbidden';
  }

  /**
   * Update a user's comment.
   * @param {string} id The comment ID.
   * @param {string} comment The comment.
   * @returns {object} The comment's data about updated data.
   */
  static async updateComment(id, { comment }) {
    const updatedComment = await Comment.update({ comment }, { where: { id } });
    return updatedComment;
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
