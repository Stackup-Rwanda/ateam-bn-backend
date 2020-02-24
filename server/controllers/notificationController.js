import dotenv from 'dotenv';
import models from '../models';

const { Notification } = models;
dotenv.config();
/**
 * This class contains all methods
 * required to handle
 * accommodations' request.
 */
class Notifications {
  /**
   * This method handle the notifications pagination.
   * @param {object} req The notification's request.
   * @param {object} res The response.
   * @param {function} next The next action.
   * @returns {object} retrived notifications.
   */
  static async viewNotifications(req, res, next) {
    const notifications = await Notification.findAll({ where: { receiverId: req.user.id }, order: [['id', 'DESC']] });
    if (notifications.length === 0) {
      return res.status(404).json({
        status: 404,
        error: `${req.user.username} You don't have notification`
      });
    }
    req.data = notifications;
    next();
  }

  /**
   * This method handle the accommodation request.
   * @param {object} req The notification's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static markOne(req, res) {
    Notification.update({ viewed: req.body.viewed }, { where: { receiverId: req.user.id, id: req.params.id } })
      .then((id) => {
        const status = id < 1 ? 404 : 200;
        res.status(status).json({
          status,
          message: ` ${status === 404 ? 'No such notification found' : `Notification marked as ${req.body.viewed}`}`
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: 404,
          error: err.message
        });
      });
  }

  /**
   * This method handle the accommodation request.
   * @param {object} req The notification's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async markAll(req, res) {
    await Notification.update({ viewed: req.body.viewed }, { where: { receiverId: req.user.id } });
    return res.status(200).json({
      status: 200,
      message: `Notifications marked as ${req.body.viewed}`
    });
  }

  /**
     * This method handle the html file.
     * @param {object} req The user's request.
     * @param {object} res The user's response.
     * @returns {object} The status and message.
     * */
  static async userNotification(req, res) {
    return res.sendFile(`/notification.html`, { root: 'UI/html' });
  }
}
export default Notifications;
