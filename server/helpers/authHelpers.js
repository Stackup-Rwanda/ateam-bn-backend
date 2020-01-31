import models from '../models';
import Hasher from './passwordHashHelper';

const { User, Token, Notification } = models;
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
          'name', 'gender', 'email', 'username', 'password', 'birthdate', 'preferredLanguage', 'preferredCurrency', 'locationId', 'role', 'department', 'lineManager', 'isVerified', 'createAt', 'updatedAt'
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
        birthdate: user.birthdate,
        preferredLanguage: user.preferredLanguage,
        preferredCurrency: user.preferredLanguage,
        location: user.location,
        role: user.role,
        department: user.department,
        lineManager: user.lineManager,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        social_id: user.id,
        provider: user.provider
      },
      {
        fields: [
          'name', 'gender', 'email', 'username', 'password', 'birthdate', 'preferredLanguage', 'preferredCurrency', 'location', 'role', 'department', 'lineManager', 'isVerified', 'createAt', 'updatedAt', 'social_id', 'provider'
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
   * @param {clientNotification} clientNotification after user request.
   * @returns {clientNotification} The user notification will stored.
   */
  static async insertNotification(clientNotification) {
    await Notification.create({
      title: clientNotification.title,
      description: clientNotification.description,
      email: clientNotification.email,
      requester: clientNotification.requester,
      manager: clientNotification.manager,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}
export default AuthHelpers;
