import { Op } from 'sequelize';
import models from '../models';

const { Trip, User } = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the trip data
 */
class TripHelpers {
  /**
   * Finds if a user has trip.
   * @param {string} tripId trip id.
   * @param {string} id userId.
   * @param {string} role user role.
   * @returns {object} The trip's data.
   */
  static async tripExists(tripId, { id, role }) {
    const trip = await Trip.findOne({
      where: { id: tripId },
      include: [
        {
          model: User,
          as: 'Users',
          attributes: ['id', 'role', 'lineManager']
        }
      ]
    });

    if (!trip) return false;

    const { lineManager } = trip.Users;
    const userId = trip.Users.id;
    if (userId === id || (role === 'Manager' && lineManager === id)) return true;

    return 'Forbidden';
  }

  /**
   * Finds a trip by status of trip and date.
   * @param {integer} id The request sent by a user.
   * @param {integer} accomId The request sent by a user.
   * @returns {object} Accommodation data.
   */
  static async findTrip(id, accomId) {
    const foundTrip = await Trip.findOne({
      where: {
        userId: id,
        accommodationId: accomId,
        status: 'Approved',
        date: {
          [Op.lt]: new Date()
        }
      }
    });
    return foundTrip;
  }

  /**
   * Finds a trip by reasons and date.
   * @param {string} trip a trip data.
   * @returns {object} trip data.
   */
  static async reasonsDate(trip) {
    const {
      userId, reasons, to, date
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
    const acceptedTrip = await Trip.create(
      {
        ...trip,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fields: [
          'userId',
          'name',
          'passportId',
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
      }
    );

    return acceptedTrip;
  }

  /**
     * Updates a trip in the DB.
     * @param {object} trip The request sent by a user.
     * @param {object} tripId id of the trip to be updated.
     * @returns {object} udpated trip data.
  */
  static async updateTrip(trip, tripId) {
    trip.updatedAt = new Date();
    try {
      const updated = await Trip.update(
        {
          tripType: trip.tripType,
          from: trip.from,
          to: trip.to,
          date: trip.date,
          returnDate: trip.returnDate,
          reasons: trip.reasons,
          accommodationId: trip.accommodationId,
          status: trip.status
        },
        {
          where: { id: tripId }
        }
      );
      return updated;
    } catch (error) {
      return error;
    }
  }
}

export default TripHelpers;
