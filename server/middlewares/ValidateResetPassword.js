import Joi from '@hapi/joi';
import error4OOHappyJoi from '../helpers/ErrorResponse';

/**
 * This class contains all methods
 * required to handle
 * signup and login endpoints' request.
 */
class Validations {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next The response.
   * @returns {object} The status and some data of the user.
   */
  static checkEmail(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required()
    });

    const { error } = schema.validate(req.body);
    error4OOHappyJoi(error, res, next);
  }

  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next The response.
   * @returns {object} The status and some data of the user.
   */
  static checkPassword(req, res, next) {
    const schema = Joi.object().keys({
      password: Joi.string().min(5).max(50).required(),
      confirmPassword: Joi.string().min(5).max(50).required()
    });

    const { error } = schema.validate(req.body);
    error4OOHappyJoi(error, res, next);
  }
}

export default Validations;
