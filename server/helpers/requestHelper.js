import models from '../models';

const { Trip } = models;
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
    const request = await Trip.findOne({ where: { [attr]: val } });
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
