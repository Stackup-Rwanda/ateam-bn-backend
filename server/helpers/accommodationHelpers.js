import models from '../models';

const {
  Accommodations, feedbacks
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
      locationId
    } = accommodation;
    const AccommodationExist = await Accommodations.findOne({
      where: {
        id,
        locationId
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
    const acceptedAccommodation = await Accommodations.create({
      ...accommodation,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
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
      ]
    });

    return acceptedAccommodation;
  }

  /**
     * Saves a feedback in the DB.
     * @param {object} feedback The request sent by a user.
     * @returns {object} Accommodation data.
     */
  static async saveFeedback(feedback) {
    const accommodationFeedback = await feedbacks.create({
      ...feedback,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fields: [
        'userId',
        'accommodationId',
        'feedback'
      ]
    });
    return accommodationFeedback;
  }
}

export default AccommodationHelpers;
