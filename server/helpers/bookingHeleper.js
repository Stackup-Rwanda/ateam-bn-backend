import models from '../models';

const {
  Room, Bookings
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the trip data
 */
class BookingHelper {
  /**
       * Saves a trip in the DB.
       * @param {object} booking,myId request sent by a user.
       * @returns {array} trip data.
       */
  static async checkRoom(booking) {
    const roomExists = await Room.findOne({
      where: {
        id: booking.roomId,
      }
    });
    return roomExists;
  }

  /**
   * This method handle the accommodation request.
   * @param {object} booking The accommodation's request.
   * @param {object} requesterId The response.
   * @returns {object} The status and some data of the accomodation.
   */
  static async saveBooked(booking, requesterId) {
    const book = await Bookings.create({
      ...booking,
      bookedBy: requesterId,
    }, {
      fields: [
        'roomId', 'tripId', 'bookedBy', 'from', 'to', 'createAt', 'updatedAt'
      ]
    });
    return book;
  }
}

export default BookingHelper;
