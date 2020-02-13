import models from '../models';

const {
  Accommodation
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the Accommodation data
 */
class AccommodationHelpers {
  /**
     * Finds a Accommodation by reasons and date.
     * @param {string} accommodation a Accommodation data.
     * @returns {object} Accommodation data.
     */
  static async accommodationInPlaceExist(accommodation) {
    const {
      id,
      placeId
    } = accommodation;
    const AccommodationExist = await Accommodation.findOne({
      where: {
        id,
        placeId
      }
    });
    return AccommodationExist;
  }

  /**
     * Saves a Accommodation in the DB.
     * @param {object} accommodation The request sent by a user.
     * @returns {object} Accommodation data.
     */
  static async saveAccommodation(accommodation) {
    const acceptedAccommodation = await Accommodation.create({
      ...accommodation,
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

    return acceptedAccommodation;
  }
}

export default AccommodationHelpers;
