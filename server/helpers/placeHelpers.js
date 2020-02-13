import models from '../models';

const {
  Place
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the Place data
 */
class PlaceHelpers {
  /**
     * Finds a Place by reasons and date.
     * @param {string} place a Place data.
     * @returns {object} Place data.
     */
  static async placeExist(place) {
    const PlaceExist = await Place.findOne({
      where: {
        id: place,
      }
    });
    return PlaceExist;
  }

  /**
     * Saves a Place in the DB.
     * @param {object} place The request sent by a user.
     * @returns {object} Place data.
     */
  static async savePlace(place) {
    const acceptedPlace = await Place.create({
      ...place,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fields: [
        'name',
        'country',
        'city',
        'createAt',
        'updatedAt'
      ]
    });

    return acceptedPlace;
  }
}

export default PlaceHelpers;
