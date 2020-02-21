import models from '../models';

const { Rating } = models;


/**
 * This class contains
 * all methods required to save
 * the ratings data
 */
class RatingHelper {
  /**
   * Finds a rating by userId and accomodationId.
   * @param {string} userId user's id table field.
   * @param {string} accommodationId accommodation's id table field..
   * @returns {object} a certain rating's data.
  */
  static async findRatedRating(userId, accommodationId) {
    const rating = await Rating.findOne({ where: { userId, accommodationId } });
    return rating;
  }

  /**
   * Finds a rating by accomodationId only.
   * @param {string} accommodationId accommodation's id table field..
   * @returns {object} a certain rating's data.
  */
  static async findLatestRating(accommodationId) {
    const rating = await Rating.findAll({ limit: 1, where: { accommodationId }, order: [['createdAt', 'DESC']] });
    return rating;
  }

  /**
   * Create the rating in the DB.
   * @param {string} userId user's id.
   * @param {string} accommodationId accommodation's id.
   * @param {string} stars rating array.
   * @returns {object} The rating's data.
  */
  static async createRating(userId, accommodationId, stars) {
    const rating = await Rating.create({
      userId, accommodationId, ratings: stars, createdAt: new Date(), updatedAt: new Date()
    }, {
      fields: ['userId', 'accommodationId', 'ratings', 'createAt', 'updatedAt']
    });
    return rating;
  }


  /**
   * Update the rating in the DB.
   * @param {string} stars rating array.
   * @param {string} id rating id.
   * @returns {object} The rating's data.
   */
  static async updateRating(stars, id) {
    const rating = await Rating.update({ ratings: stars }, { where: { id } });
    return rating;
  }
}

export default RatingHelper;
