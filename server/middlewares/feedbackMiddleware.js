import tripHelper from '../helpers/tripHelpers';

/**
 * This class contains methods that handles the feedback on accommodation
 */
class allowFeedback {
  /**
   * This method handles the feedback on accommodation request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next cal.
   * @returns {object} The message.
   */
  static async allowFeedback(req, res, next) {
    const foundTrip = await tripHelper.findTrip(req.user.id, req.params.accommodationId);
    if (!foundTrip) {
      return res.status(400).json({
        status: 400,
        message: 'you cannot give feedback to an accommodation you have not been to'
      });
    }
    next();
  }

  /**
   * This method handles the feedback on accommodation request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next cal.
   * @returns {object} The message.
   */
  static async validateParams(req, res, next) {
    const accomId = req.params.accommodationId;
    if (Number.isNaN(Number(accomId))) {
      return res.status(400).json({
        status: 400,
        error: 'please provide a valid accommodation Id'
      });
    }
    next();
  }
}

export default allowFeedback;
