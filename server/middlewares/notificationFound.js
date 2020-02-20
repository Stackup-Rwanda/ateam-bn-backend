import dotenv from 'dotenv';
import models from '../models';

const { Notification } = models;

dotenv.config();

/**
 * This class contains all methods
 * required to handle
 * accommodations' request.
 */
class Check {
  /**
   * This method handle the accommodation request.
   * @param {object} req The response.
   *  @param {object} res The response.
   * @param {object} next The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async NotificationFound(req, res, next) {
    const foundNotice = await Notification.findAll({
      where: {
        receiverId: req.user.id
      }
    });
    if (foundNotice.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'You dont have any notifications'
      });
    }
    next();
  }
}
export default Check;
