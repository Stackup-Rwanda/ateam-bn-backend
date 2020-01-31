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
     * Finds a trip by reasons and date.
     * @param {string} trip a trip data.
     * @returns {object} trip data.
     */
  static async reasonsDate(trip) {
    const tripExist = await Trip.findOne({
      where: {
        reasons: trip.reasons,
        date: trip.date
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
      tripType: trip.type,
      from: trip.from,
      to: trip.to,
      date: trip.date,
      returnDate: trip.returnDate,
      reasons: trip.reasons,
      accommodation: trip.accommodation,
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
        'returnDate',
        'reasons',
        'accommodation',
        'status',
        'createAt',
        'updatedAt'
      ]
    });

    return acceptedTrip;
  }
}

export default TripHelpers;
