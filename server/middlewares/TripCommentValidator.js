import Joi from '@hapi/joi';
import error4OOHappyJoi from '../helpers/ErrorResponse';

/**
 * This class contains all methods
 * required to handle
 * signup and login endpoints' request.
 */
class CommentValidator {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next The response.
   * @returns {object} The status and some data of the user.
   */
  static newComment(req, res, next) {
    const schema = Joi.object().keys({
      comment: Joi.string().min(2).required()
    });
    const { error } = schema.validate(req.body, {
      abortEarly: false
    });

    return error4OOHappyJoi(error, res, next);
  }
}

export default CommentValidator;
