import Sequelize from 'sequelize';
import models from '../models';


const { Op } = Sequelize;
const { Trip, User, Accommodations } = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the trip data
 */
class SearchHelpers {
  /**
       * Saves a trip in the DB.
       * @param {object} request,myId request sent by a user.
       * @returns {array} trip data.
       */
  static async searchByInteger({ request, myId }) {
    const findRequest = await Trip.findAll({
      where: {
        [Op.or]: [
          { id: request },
          { userId: request },
          { from: request },
          { to: { [Op.contains]: [request] } }
        ],
        userId: myId
      },
      include: [{
        model: User,
        as: "User",
        attributes: ['name', 'email', 'username', 'role', 'locationId', 'lineManager', 'gender', 'createdAt', 'updatedAt']
      }, {
        model: Accommodations,
        as: 'Accommodations',
        attributes: ['id', 'image', 'name']
      }]


    });
    return findRequest;
  }

  /**
       * Saves a trip in the DB.
       * @param {string} request The request sent by a user.
       * @returns {array} trip data.
       */
  static async searchByString({ request, myId }) {
    const findStringData = await Trip.findAll({
      where: {
        [Op.or]: [
          { status: request },
        ],
        userId: myId
      },
      include: [{
        model: User,
        as: "User",
        attributes: ['name', 'email', 'username', 'role', 'locationId', 'lineManager', 'gender', 'createdAt', 'updatedAt']
      }, {
        model: Accommodations,
        as: 'Accommodations',
        attributes: ['id', 'image', 'name']
      }]

    });
    return findStringData;
  }


  /**
       * Saves a trip in the DB.
       * @param {string} request The request sent by a user.
       * @returns {array} trip data.
       */
  static async managerStringSearch(request) {
    const findStringData = await Trip.findAll({
      where: {
        [Op.or]: [
          { status: request },
        ]
      },
      include: [{
        model: User,
        as: "User",
        attributes: ['name', 'email', 'username', 'role', 'locationId', 'lineManager', 'gender', 'createdAt', 'updatedAt'],

      }, {
        model: Accommodations,
        as: 'Accommodations',
        attributes: ['id', 'image', 'name']
      }]

    });
    return findStringData;
  }

  /**
       * Saves a trip in the DB.
       * @param {object} request,myId request sent by a user.
       * @returns {array} trip data.
       */
  static async managerIntegerSearch(request) {
    const findRequest = await Trip.findAll({
      where: {
        [Op.or]: [
          { id: request },
          { userId: request },
          { from: request },
          { to: { [Op.contains]: [request] } }
        ],
      },
      include: [{
        model: User,
        as: "User",
        attributes: ['name', 'email', 'username', 'role', 'locationId', 'lineManager', 'gender', 'createdAt', 'updatedAt']
      }, {
        model: Accommodations,
        as: 'Accommodations',
        attributes: ['id', 'image', 'name']
      }]

    });
    return findRequest;
  }

  /**
       * Saves a trip in the DB.
       * @param {object} request,myId request sent by a user.
       * @returns {array} trip data.
       */
  static async managerDateSearch(request) {
    try {
      const findRequest = await Trip.findAll({

        where: {
          [Op.or]: [
            { date: request },
            { returnDate: request }
          ],
        },
        include: [{
          model: User,
          as: "User",
          attributes: ['name', 'email', 'username', 'role', 'locationId', 'lineManager', 'gender', 'createdAt', 'updatedAt']
        }, {
          model: Accommodations,
          as: 'Accommodations',
          attributes: ['id', 'image', 'name']
        }]

      });
      return findRequest;
    } catch (error) {
      return error;
    }
  }

  /**
       * Saves a trip in the DB.
       * @param {object} request,myId request sent by a user.
       * @returns {array} trip data.
       */
  static async requesterDateSearch({ request, myId }) {
    try {
      const findRequest = await Trip.findAll({

        where: {
          [Op.or]: [
            { date: request },
            { returnDate: request }
          ],
          userId: myId
        },
        include: [{
          model: User,
          as: "User",
          attributes: ['name', 'email', 'username', 'role', 'locationId', 'lineManager', 'gender', 'createdAt', 'updatedAt']
        }, {
          model: Accommodations,
          as: 'Accommodations',
          attributes: ['id', 'image', 'name']
        }]

      });
      return findRequest;
    } catch (error) {
      return error;
    }
  }
}


export default SearchHelpers;
