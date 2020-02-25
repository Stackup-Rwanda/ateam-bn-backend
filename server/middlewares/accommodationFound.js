import dotenv from 'dotenv';
import models from '../models';

const { Accommodations } = models;

dotenv.config();

/**
 * This class contains all methods
 * required to handle
 * accommodations' request.
 */
class Check {
  /**
   * This method handle the accommodation request.
   * @param {object} id The notification's request.
   * @param {object} req The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async AccommodationFound(id, req) {
    const exists = await Accommodations.findOne({
      where: { id }
    });
    if (exists) {
      req.oldAccommodation = exists;
      return true;
    }
    return false;
  }

  /**
   * This method handle the accommodation request.
   * @param {object} req The notification's request.
   * @param {object} res The response.
   * @param {object} next The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async CheckAccommodation(req, res, next) {
    let { id } = req.params;
    if (!Number.isNaN(Number(id))) {
      id = parseInt(id, 10);
      if (await Check.AccommodationFound(id, req)) {
        return next();
      }
      return res.status(404).json({ status: 404, error: `No such acommodation found` });
    }
    return res.status(400).json({ status: 400, error: `malformed accommodation id ${id}` });
  }

  /**
   * This method handle the accommodation request.
   * @param {object} req The notification's request.
   * @param {object} res The response.
   * @param {object} next The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async checkOwner(req, res, next) {
    if (req.oldAccommodation.createdBy === req.user.id) {
      return next();
    }
    return res.status(401).json({
      status: 401,
      message: 'You are not the owner of this Accommodation'
    });
  }
}
export default Check;
