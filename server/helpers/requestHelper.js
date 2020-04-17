import models from '../models';

const { Trip, Accommodations, User, Comment } = models;
/**
 * This class contains
 * all methods required to view/approve/reject
 * the user's data
 */
class RequestHelper {
  /**
   * Finds the request in the DB.
   * @param {string} attr notifications table field.
   * @param {string} val value to be found.
   * @returns {object} The notification's data.
   */
  static async findRequest(attr, val) {
    const request = await Trip.findOne({
      where: { [attr]: val },
      include:
      [
        {
          model: Accommodations,
          as: 'Accommodations',
          attributes: ['id', 'image', 'name']
        },
        {
          model: User,
          as: 'User',
          attributes: [
            'id',
            'name',
            'email',
            'profilePhoto',
            'coverPhoto',
            'department',
            'username'
          ]
        },
        {
          model: Comment,
          as: 'Comments',
          attributes: ['id', 'comment', 'createdAt']
        }
      ]
    });
    return request;
  }

  /**
   * Finds the request in the DB.
   * @param {integer} accommodationId trip table's accommodation.
   * @param {integer} userId trip table's user id value to be found.
   * @returns {object} The notification's data.
   */
  static async findTripRequest(accommodationId, userId) {
    const request = await Trip.findOne({
      where: { accommodationId, userId },
      include:
      [
        {
          model: Accommodations,
          as: 'Accommodations',
          attributes: ['id', 'image', 'name']
        },
        {
          model: User,
          as: 'User',
          attributes: [
            'id',
            'name',
            'email',
            'profilePhoto',
            'coverPhoto',
            'department',
            'username'
          ]
        },
        {
          model: Comment,
          as: 'Comments',
          attributes: ['id', 'comment', 'createdAt']
        }
      ]
    });
    return request;
  }

  /**
   * Finds the request in the DB.
   * @param {string} state notifications table field.
   * @param {string} id value to be found.
   * @returns {object} The notification's data.
   */
  static async updateStatus(state, id) {
    const requests = await Trip.update({ status: state }, { where: { id } });
    return requests;
  }
}

export default RequestHelper;
