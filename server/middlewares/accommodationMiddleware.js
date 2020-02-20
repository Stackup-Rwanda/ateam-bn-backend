import models from '../models';
import tripHelper from '../helpers/tripHelpers';

const { Accommodations } = models;

/**
 * This class contains
 * all methods required to validate feedback and reaction about accommodation
 * the Accommodation data
 */
class accommodationMiddleware {
  /**
   * This method validates the accommodation Id.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next cal.
   * @returns {object} The message.
   */
  static async validateAccommodationId(req, res, next) {
    const foundAccommodation = await Accommodations.findOne({ where: { id: req.params.accommodationId } });
    if (!foundAccommodation) {
      return res.status(404).json({
        status: 404,
        error: 'Accommodation does not exist'
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
export default accommodationMiddleware;
