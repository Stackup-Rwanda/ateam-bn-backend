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
   * @param {object} req The user's trip request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the trip.
   */
  static async approveRequest(req, res) {
    const reqq = await RequestHelper.findRequest('id', parseInt(req.params.id, 10));

    if (!reqq) {
      res.status(400).json({
        status: 400,
        error: 'Please provide a authentic request'
      });
    }

    const manager = await users.userExists('id', parseInt(reqq.userId, 10));
    const properManager = await users.userExists('id', parseInt(req.userData.id, 10));

    if (manager.lineManager === properManager.username) {
      await RequestHelper.updateStatus(req.body.status, parseInt(req.params.id, 10));
      return res.status(200).json({
        status: 200,
        message: 'This trip request was successfully approved'
      });
    }
    
    return res.status(403).json({
      status: 403,
      error: 'You are not authorized to approve this request'
    });
  }
}

export default RequestController;
