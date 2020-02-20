import models from '../models';

const { Trip } = models;

/**
 * This class contains methods that handle the rememberMe field data
 * coming form the request
 */
class rememberMeValidation {
  /**
   * This method handles the travel profile request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next cal.
   * @returns {object} The message.
   */
  static async IfRememberProfile(req, res, next) {
    if (req.user.rememberMe === true) {
      const foundUsers = await Trip.findAll({
        limit: 1,
        where: {
          userId: req.user.id
        },
        order: [['createdAt', 'DESC']]
      });
      req.body.name = foundUsers[0].name;
      req.body.reasons = foundUsers[0].reasons;
      req.body.passportId = foundUsers[0].passportId;
      next();
    } else {
      next();
    }
  }

  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next cal.
   * @returns {object} The message.
   */
  static async rememberMe(req, res, next) {
    const foundUser = await Trip.findOne({ where: { userId: req.user.id } });
    if (req.params.state === true) {
      if (!foundUser) {
        return res.status(404).json({
          status: 404,
          message: 'cannot remember profle without data'
        });
      }
    }
    next();
  }
}
export default rememberMeValidation;
