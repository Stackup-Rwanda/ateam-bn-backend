import models from '../models';

const {
  Accommodations, feedbacks, reactions
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
    const { id, locationId } = accommodation;
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
          'highlights',
          'amenities'
        ]
      }
    );

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

  /**
   * Saves a reaction in the DB.
   * @param {object} reaction The request sent by a user.
   * @returns {object} Accommodation data.
   */
  static async saveReaction(reaction) {
    const UserReaction = await reactions.create(
      {
        ...reaction,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fields: ['userId', 'accommodationId', 'reactionType']
      }
    );
    return UserReaction;
  }


  /**
   * finds a reaction by userId and accommodationId.
   * @param {integer} userId The request sent by a user.
   * @param {integer} accommodationId The request sent by a user.
   * @returns {object} reaction data.
   */
  static async findByUserAndAccomodation(userId, accommodationId) {
    const UserReaction = await reactions.findAll({
      where: {
        userId,
        accommodationId
      }
    });

    return UserReaction;
  }

  /**
   * finds a reaction by userId and reactionType.
   * @param {integer} userId The request sent by a user.
   * @param {integer} accommodationId The request sent by a user.
   * @param {integer} reactionType The request sent by a user.
   * @returns {object} reaction data.
   */
  static async findByUserAccommAndReactionType(userId, accommodationId, reactionType) {
    const UserReactionExist = await reactions.findOne({
      where: {
        userId,
        accommodationId,
        reactionType
      }
    });

    return UserReactionExist;
  }

  /**
   * finds a reaction by userId and reactionType.
   * @param {integer} accommodationId The request sent by a user.
   * @param {integer} reactionType The request sent by a user.
   * @returns {object} reaction data.
   */
  static async findByAccommAndReactionType(accommodationId, reactionType) {
    const { count } = await reactions.findAndCountAll({
      where: {
        accommodationId,
        reactionType
      }
    });

    return count;
  }

  /**
   * deletes a reaction by userId and accommodationId.
   * @param {integer} userId The request sent by a user.
   * @param {integer} accommodationId The request sent by a user.
   * @param {string} reactionType The request sent by a user.
   * @returns {object} reaction data.
   */
  static async deleteReaction(userId, accommodationId, reactionType) {
    const deletedReaction = await reactions.destroy({ where: { userId, accommodationId, reactionType } });
    return deletedReaction;
  }

  /**
   * deletes a reaction by userId and accommodationId.
   * @param {integer} userId The request sent by a user.
   * @param {integer} accommodationId The request sent by a user.
   * @param {string} reactionType The request sent by a user.
   * @returns {object} reaction data.
   */
  static async deleteLikeAndFire(userId, accommodationId) {
    const deletedReaction = await reactions.destroy({ where: { userId, accommodationId, reactionType: ['like', 'fire'] } });
    return deletedReaction;
  }
}

export default AccommodationHelpers;
