import notification from '../helpers/notifications';
import RequestHelper from '../helpers/requestHelper';
import users from '../helpers/authHelpers';

/**
 * This class contains all methods
 * required to approve/reject
 *  atrip requests.
 */
class RequestController {
  /**
   * This method approve the trip request.
   * @param {object} req The http request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async approveRequest(req, res) {
    const requestExists = await RequestHelper.findRequest('id', parseInt(req.params.id, 10));

    if (!requestExists) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a authentic request'
      });
    }

    const user = await users.userExists('id', parseInt(requestExists.userId, 10));
    const manager = await users.userExists('id', parseInt(req.userData.id, 10));

    if (user.lineManager === manager.id) {
      await RequestHelper.updateStatus(req.body.status, parseInt(req.params.id, 10));
      const trip = await RequestHelper.findRequest('id', parseInt(req.params.id, 10));
      await notification.sendNotification(trip.id, trip.status, res);
      return res.status(200).json({
        status: 200,
        message: 'This trip request was successfully approved',
        data: trip
      });
    }

    return res.status(403).json({
      status: 403,
      error: 'You are not authorized to approve this request'
    });
  }

  /**
   * This method reject the trip request.
   * @param {object} req the http request.
   * @param {object} res the response.
   * @returns {object} The status and some data of the trip.
   */
  static async rejectRequest(req, res) {
    const requestExists = await RequestHelper.findRequest('id', parseInt(req.params.id, 10));

    if (!requestExists) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide a authentic request'
      });
    }

    const user = await users.userExists('id', parseInt(requestExists.userId, 10));
    const manager = await users.userExists('id', parseInt(req.userData.id, 10));

    if (user.lineManager === manager.id) {
      await RequestHelper.updateStatus(req.body.status, parseInt(req.params.id, 10));
      const trip = await RequestHelper.findRequest('id', parseInt(req.params.id, 10));
      await notification.sendNotification(trip.id, trip.status, res);
      return res.status(200).json({
        status: 200,
        message: 'This trip request has been rejected',
        data: trip
      });
    }

    return res.status(403).json({
      status: 403,
      error: 'You are not authorized to reject this request'
    });
  }
}

export default RequestController;
