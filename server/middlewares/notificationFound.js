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
   * @param {object} id The notification's request.
   * @param {object} req The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async NotificationFound(id, req) {
    const exists = await Notification.findAll({
      where: { id }
    });
    if (exists) {
      req.oldNotification = exists;
      return true;
    }
    return false;
  }

  /**
   * This method handle the accommodation request.
   * @param {object} req The notification's request.
   * @param {object} res The response.
   * @param {object} next The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async CheckNotification(req, res, next) {
    let { id } = req.params;
    if (!Number.isNaN(Number(id))) {
      id = parseInt(id, 10);
      if (await Check.NotificationFound(id, req)) {
        return next();
      }
      return res.status(404).json({ status: 404, error: `Notifications not found` });
    }
    return res.status(400).json({ status: 400, error: `malformed notification id ${id}` });
  }
}
export default Check;
