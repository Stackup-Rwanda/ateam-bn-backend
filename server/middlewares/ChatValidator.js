import Joi from '@hapi/joi';
import error4OOHappyJoi from '../helpers/ErrorResponse';

/**
 * This class contains all methods
 * required to handle
 * signup and login endpoints' request.
 */
class ChatValidator {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next The response.
   * @returns {object} The status and some data of the user.
   */
  static ValidateMessage(req, res, next) {
    const schema = Joi.object().keys({
      message: Joi.string().min(1).required()
    });
    const { error } = schema.validate(req.body, {
      abortEarly: false
    });

    error4OOHappyJoi(error, res, next);
  }
}

export default ChatValidator;
