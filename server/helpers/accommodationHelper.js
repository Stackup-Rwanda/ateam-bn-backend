import models from '../models';

const { Accommodations } = models;


/**
 * This class contains
 * all methods required to save
 * the accommodation's data
 */
class AccommodationHelper {
  /**
   * Saves the accommodation in the DB.
   * @param {object} accommodation The request sent by a user.
   * @returns {object} The accommodation's data.
   */
  static async saveAccommodation(accommodation) {
    const acceptedAccommodation = await Accommodations.create(
      {
        ...accommodation,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fields: [
          'name',
          'description',
          'image',
          'locationId',
          'geoLocation',
          'space',
          'cost',
          'highlights',
          'amenities',
          'createdAt',
          'updatedAt'
        ]
      }
    );
    return acceptedAccommodation;
  }
}
export default AccommodationHelper;
