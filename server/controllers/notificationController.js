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
   * This method handle the accommodation request.
   * @param {object} req The notification's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async viewNotifications(req, res) {
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
    return res.status(200).json({
      status: 200,
      data: foundNotice
    });
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
}
export default Notifications;
