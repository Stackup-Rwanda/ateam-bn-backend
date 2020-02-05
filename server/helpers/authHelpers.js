import models from '../models';

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
          'name', 'gender', 'email', 'username', 'password', 'birthdate', 'preferredLanguage', 'preferredCurrency', 'location', 'role', 'department', 'lineManager', 'isVerified', 'createAt', 'updatedAt'
        ]
      }
    );
    return acceptedUser;
  }

  /**
   * insert generatyed token into table in the DB.
   * @param {string} generatedtoken The request sent by a user.
   * @returns {string} The users's token.
   */
  static async insertGeneratedToken(generatedtoken) {
    await Token.create({
      value: generatedtoken,
      createdAt: new Date(),
      updatedAt: new Date()
    });
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
    const createdNotification = await Notification.create(clientNotification);
    return createdNotification;
  }
}
export default AuthHelpers;
