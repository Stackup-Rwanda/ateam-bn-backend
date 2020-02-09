import RequestHelper from '../helpers/requestHelper';

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
    await RequestHelper.updateStatus('Approved', parseInt(req.params.id, 10));
    const reqq = await RequestHelper.findRequest('id', parseInt(req.params.id, 10));
    res.status(200).json({
      status: 200,
      data: reqq
    });
  }
}

export default RequestController;