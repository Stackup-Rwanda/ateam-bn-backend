import models from '../models';
import Hasher from './passwordHashHelper';

const {
  User, Token, Notification, Trip, Accommodations, Comment
} = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the user's data
 */
class AuthHelpers {
  /**
   * Finds the user's email if he/she exists.
   * @param {string} attr users table field.
   * @param {string} val value to be found.
   * @returns {object} The users's data.
   */
  static async userExists(attr, val) {
    const user = await User.findOne({ where: { [attr]: val } });
    return user;
  }

  /**
   * Update a user's password.
   * @param {string} id The user's username.
   * @param {string} password The user's username.
   * @returns {object} The user's data about update password.
   */
  static async updateUserPassword(id, { password }) {
    const hashedPwd = Hasher.hashPassword(password);
    const updatedUser = await User.update({ password: hashedPwd }, { where: { id } });
    await Token.destroy({ where: { userId: id } });
    return updatedUser;
  }

  /**
   * Update a user's password.
   * @param {integer} id The user's id.
   * @param {string} state The user's username.
   * @returns {object} The user's data about update password.
   */
  static async UpdateRememberMe(id, state) {
    const updatedUser = await User.update({ rememberMe: state }, { where: { id } });
    return updatedUser;
  }

  /**
   * Finds the user's email if he/she exists.
   * @param {string} email users table field.
   * @returns {object} The users's data.
   */
  static async confirm(email) {
    const user = await User.update({ isVerified: true }, { where: { email } });
    return user;
  }

  /**
   * Saves the user in the DB.
   * @param {object} user The request sent by a user.
   * @returns {object} The users's data.
   */
  static async saveUser(user) {
    const acceptedUser = await User.create(
      {
        ...user, isVerified: false, createdAt: new Date(), updatedAt: new Date()
      },
      {
        fields: [
          'name', 'gender', 'email', 'username', 'password', 'pasportId', 'birthdate', 'preferredLanguage', 'preferredCurrency', 'location', 'role', 'department', 'lineManager', 'isVerified', 'rememberMe', 'createAt', 'updatedAt'
        ]
      }
    );
    return acceptedUser;
  }

  /**
   * insert generatyed token into table in the DB.
   * @param {string} generatedtoken The request sent by a user.
   * @param {integer} userId The user id.
   * @returns {string} The users's token.
   */
  static async insertGeneratedToken(generatedtoken, userId) {
    await Token.create({
      value: generatedtoken,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  /**
   * Saves the user in the DB.
   * @param {object} user The request sent by a user.
   * @returns {object} The users's data.
   */
  static async saveSocial(user) {
    const acceptedUser = await User.create(
      {
        name: user.displayName,
        gender: user.gender,
        email: user.emails[0].value,
        username: user.username,
        password: user.password,
        passportId: user.passportId,
        birthdate: user.birthdate,
        profilePhoto: user.profilePhoto,
        preferredLanguage: "English",
        preferredCurrency: "Rwf",
        location: user.location,
        role: "REQUESTER",
        department: user.department,
        lineManager: 3,
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        social_id: user.id,
        provider: user.provider
      },
      {
        fields: [
          'name', 'gender', 'email', 'username', 'password', 'birthdate', 'profilePhoto', 'preferredLanguage', 'preferredCurrency', 'location', 'role', 'department', 'lineManager', 'isVerified', 'createAt', 'updatedAt', 'social_id', 'provider'
        ]
      }
    );

    return acceptedUser;
  }

  /**
   * delete token from validtoken table in the DB.
   * @param {string} validtoken The request sent by a user.
   * @returns {string} The users's token.
   */
  static async deleteValidToken(validtoken) {
    await Token.destroy({ where: { value: validtoken } });
  }

  /**
   * insert notification into Notification table in the DB.
   * @param {integer} trip after user request.
   * @param {integer} receiver after user request.
   * @param {string} desc after user request.
   * @returns {object} The user notification will stored.
   */
  static async insertNotification(trip, receiver, desc) {
    const createdNotification = await Notification.create({
      tripId: trip,
      receiverId: receiver,
      description: desc,
      viewed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return createdNotification;
  }

  /**
   * retrieve Trip from Trip table in the DB.
   * @param {integer} tripId after user request.
   * @returns {object} The Trip will retrieved.
   */
  static async retrieveTrip(tripId) {
    const findTrip = Trip.findOne({
      where: { id: tripId },
      include: [
        {
          model: User,
          as: 'User',
          attributes: [
            'id',
            'name',
            'email',
            'profilePhoto',
            'coverPhoto',
            'department',
            'username'
          ]
        },
        {
          model: Accommodations,
          as: 'Accommodations',
          attributes: ['id', 'image', 'name']
        },
        {
          model: Comment,
          as: 'Comments',
          attributes: ['id', 'comment', 'createdAt']
        }
      ]
    });
    return findTrip;
  }

  /**
   * Finds the user's details from user table in database.
   * @param {integer} userId userId table field.
   * @returns {object} The user's details.
   */
  static async userDetails(userId) {
    const userData = await User.findOne({ where: { id: userId } });
    return userData;
  }

  /**
    * Finds the user's details from user table in database.
    * @param {integer} argument userId table field.
    * @returns {object} The user's details.
    */
  static async retrieveOneNotificationById(argument) {
    const userNotification = await Notification.findAll({ where: { receiverId: argument } }).then((userNotify) => userNotify);
    return userNotification;
  }

  /**
   * Finds a users.
   * @param {integer} skip limit.
   * @param {integer} start from.
   * @returns {object} users request data.
   */
  static async findAllUsers(skip, start) {
    const foundUsers = await User.findAndCountAll({
      limit: skip,
      offset: start,
      attributes: ['id', 'name', 'email', 'username', 'role', 'lineManager']
    });
    return foundUsers;
  }


  /**
   * Finds a manager.
   * @param {integer} skip limit.
   * @param {integer} start from.
   * @returns {object} manager request data.
   */
  static async findAllManagers(skip, start) {
    const foundUsers = await User.findAndCountAll({
      where: { role: 'MANAGER' },
      limit: skip,
      offset: start,
      attributes: ['id', 'name', 'email', 'username', 'role', 'lineManager']
    });
    return foundUsers;
  }

  /**
   * Updates user's messagesLastSeen.
   * @param {integer} id users table field.
   * @returns {object} The users's data.
   */
  static async updateLastSeen(id) {
    const user = await User.update({ messageLastSeen: new Date() }, { where: { id } });
    return user;
  }
}

export default AuthHelpers;
