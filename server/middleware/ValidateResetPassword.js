import Joi from '@hapi/joi';

/**
 * This class contains all methods
 * required to handle
 * signup and login endpoints' request.
 */
class ValidateResetPassword {
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
    if (error) {
      res.status(400).json({
        status: res.statusCode,
        error: error.details[0].message.replace(/"/g, ''),
      });
    } else next();
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
    if (error) {
      res.status(400).json({
        status: res.statusCode,
        error: error.details[0].message.replace(/"/g, ''),
      });
    } else next();
  }
}

export default ValidateResetPassword;
