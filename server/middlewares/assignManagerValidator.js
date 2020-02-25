import Joi from '@hapi/joi';
import models from '../models';

const { User } = models;

/**
 * This class contains all methods
 * required to handle
 * trip endpoints' request.
 */
class validateManagerAssignment {
  /**
   * This method validates ids passed to the route.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next The the next line.
   * @returns {object} The status and some data of the trip.
   */
  static async validateIds(req, res, next) {
    const { manager, requesters } = req.body;
    const missingRequesters = [];
    let errorMessage;

    const managerExists = await User.findOne({
      attributes: ['id', 'name', 'username', 'role', 'lineManager'],
      where: { id: manager, role: 'Manager' }
    });
    const requestersExist = await User.findAll({
      attributes: ['id', 'name', 'username', 'role', 'lineManager'],
      where: { id: requesters, role: 'Requester' }
    });

    if (!managerExists) {
      errorMessage = `no manager was found with id matching ${manager}`;
    }
    if (requestersExist.length !== requesters.length) {
      requesters.forEach((id) => {
        if (!requestersExist.find((user) => user.id === id)) {
          missingRequesters[missingRequesters.length] = id;
        }
      });
      if (errorMessage) {
        errorMessage += `, and requesters with id matching ${missingRequesters} were not found`;
      } else {
        errorMessage = `requesters with id matching ${missingRequesters} were not found`;
      }
    }

    if (!errorMessage) {
      req.managerId = manager;
      req.requestersIds = requesters;
      return next();
    }
    return res.status(400).json({ status: 400, error: errorMessage });
  }

  /**
   * This method validates ids passed to the route.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @param {object} next The the next line.
   * @returns {object} The status and some data of the trip.
   */
  static async validateFields(req, res, next) {
    const schema = Joi.object({
      manager: Joi.number().integer().required().messages({ 'number.base': 'Invalid type, managerId must be an integer', 'number.unsafe': 'only manager id of type integer are allowed' }),
      requesters: Joi.array().items(Joi.number().integer()).required().messages({ 'number.unsafe': 'only requester id numbers of type integer are allowed' })
    });
    const { error } = schema.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
      return res.status(400).json({ status: 400, error: message });
    }
    return next();
  }
}

export default validateManagerAssignment;
