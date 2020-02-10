import models from '../models';

const {
  Trip
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the trip data
 */
class TripHelpers {
  /**
   * Finds if a user has trip.
   * @param {string} id trip id.
   * @param {string} userId userId of a trip.
   * @returns {object} The trip's data.
   */
  static async userTripExists(id, userId) {
    const trip = await Trip.findOne({ where: { id, userId } });
    return trip;
  }

  /**
     * Finds a trip by reasons and date.
     * @param {string} trip a trip data.
     * @returns {object} trip data.
     */
  static async reasonsDate(trip) {
    const {
      userId,
      reasons,
      to,
      date
    } = trip;
    const newDate = new Date(date);
    const tripExist = await Trip.findOne({
      where: {
        userId,
        reasons,
        to,
        date: newDate
      }
    });
    return tripExist;
  }

  /**
     * Saves a trip in the DB.
     * @param {object} trip The request sent by a user.
     * @returns {object} trip data.
     */
  static async saveTrip(trip) {
    const acceptedTrip = await Trip.create({
      userId: trip.userId,
      tripType: trip.typeType,
      from: trip.from,
      to: trip.to,
      date: trip.date,
      reasons: trip.reasons,
      accommodationId: trip.accommodationId,
      status: trip.status,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fields: [
        'userId',
        'tripType',
        'from',
        'to',
        'date',
        'reasons',
        'accommodationId',
        'returnDate',
        'status',
        'createAt',
        'updatedAt'
      ]
    });

    return acceptedTrip;
  }
}

export default TripHelpers;
