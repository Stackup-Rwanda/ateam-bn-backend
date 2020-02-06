import models from '../models';
import Hasher from './passwordHashHelper';

const { User } = models;
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
          'name', 'gender', 'email', 'username', 'password', 'birthdate', 'preferredLanguage', 'preferredCurrency', 'location', 'role', 'department', 'lineManager', 'isVerified', 'createAt', 'updatedAt'
        ]
      }
    );
    return acceptedUser;
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
        google_id: user.id,
        fb_id: user.fbId
      },
      {
        fields: [
          'name', 'gender', 'email', 'username', 'password', 'birthdate', 'preferredLanguage', 'preferredCurrency', 'location', 'role', 'department', 'lineManager', 'isVerified', 'createAt', 'updatedAt', 'google_id', 'fb_id'
        ]
      }
    );

    return acceptedUser;
  }
}
export default AuthHelpers;
