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
          'createdBy',
          'name',
          'description',
          'image',
          'locationId',
          'geoLocation',
          'space',
          'cost',
          'highlights',
          'amenities',
          'ratings',
          'createdAt',
          'updatedAt'
        ]
      }
    );
    return acceptedAccommodation;
  }

  /**
     * Finds a Accommodation by reasons and date.
   * @param {string} attr accommodations table field.
   * @param {string} val value to be found.
     * @returns {object} Accommodation data.
     */
  static async findAccommodation(attr, val) {
    const AccommodationExist = await Accommodations.findOne({ where: { [attr]: val } });
    return AccommodationExist;
  }
}
export default AccommodationHelper;
