import { Op } from 'sequelize';
import models from '../models';

const { Place } = models;
/**
 * This class contains
 * all methods required to handle Locations
 */
class Destinstion {
  /**
  * Find matching location.
  * @param {integer} id to table field.
  * @returns {string} The place details.
  */
  async findMatchLocations(id) {
    const locationsName = await Place.findOne({ where: { id } });
    return locationsName;
  }

  /**
  * Update visited times.
  * @param {integer} times to table field.
  * @param {integer} id to table field.
  * @returns {string} The destinstion name.
  */
  async updateVisitedTimes(times, id) {
    const locationName = await Place.update({ visitedtimes: times }, { where: { id } });
    return locationName;
  }

  /**
  * find visited times.
  * @returns {integer} The destinstion name.
  */
  async findVisitedTimes() {
    const visitedTimes = await Place.findAll({
      limit: 3, where: { visitedtimes: { [Op.not]: 0 } }, attributes: ['visitedtimes', 'country', 'city'], order: [['visitedtimes', 'DESC']]
    });
    const information = visitedTimes.map((value) => {
      const country = `The country visited is ${value.country}`;
      const capitalCity = `The capital city of this country is ${value.city}`;
      const visitTimes = `This country had visited by different vistors ${value.visitedtimes} times `;
      return { country, capitalCity, visitTimes };
    });
    return information;
  }

  /**
   * Finds a place by user .
   * @param {integer} skip limit.
   * @param {integer} start from.
   * @returns {object} place request data.
   */
  async findPlaces(skip, start) {
    const foundPlaces = await Place.findAndCountAll({ limit: skip, offset: start });
    return foundPlaces;
  }
}

const exportDestinstion = new Destinstion();
export default exportDestinstion;
