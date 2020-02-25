import models from '../models';

const { Accommodations } = models;
const { Room } = models;
/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the trip data
 */
class RoomHelper {
  /**
       * Saves a trip in the DB.
       * @param {object} room,myId request sent by a user.
       * @returns {array} trip data.
       */
  static async checkAccommodation(room) {
    const accommodationExistts = await Accommodations.findOne({
      where: {
        id: room.accommodationId
      }
    });
    return accommodationExistts;
  }

  /**
       * Saves a trip in the DB.
       * @param {object} room,myId request sent by a user.
       * @returns {array} trip data.
       */
  static async saveRoom(room) {
    const saved = await Room.create({
      ...room
    }, {
      fields: [
        'accommodationId', 'roomType', 'amenities', 'cost', 'image', 'status', 'createAt', 'updatedAt'
      ]
    });
    return saved;
  }
}

export default RoomHelper;
