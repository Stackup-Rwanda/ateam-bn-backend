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
   * @returns {object} The status and some data of the user.
   */
  static validatePassword() {
    return Joi.string().trim().required().min(8)
      .alphanum()
      .max(50);
  }

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
      password: Validations.validatePassword(),
      confirmPassword: Validations.validatePassword()
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
  static checkPasswordAnConfirmPassword(req, res, next) {
    if (req.body.password === req.body.confirmPassword) {
      return next();
    }
    res.status(400).json({
      status: res.statusCode,
      error: 'Sorry, Password Confirm Password must match.',
    });
  }
}

export default Validations;
