import UserModel from '../models/user';
import Hasher from './passwordHashHelper';

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the user's data
 */
class AuthHelpers {
  /**
   * Finds the user's email if he/she exists.
   * @param {string} email The user's email.
   * @returns {object} The users's data.
   */
  static async emailExists(email) {
    const user = await UserModel.findOne({ where: { email } });
    return user;
  }

  /**
   * Finds the user's email if he/she exists.
   * @param {string} id The user's email.
   * @returns {object} The users's data.
   */
  static async getUserById(id) {
    const user = await UserModel.findOne({ where: { id } });
    return user;
  }


  /**
   * Finds the user's username if he/she exists.
   * @param {string} username The user's username.
   * @returns {object} The users's data.
   */
  static async usernameExists(username) {
    const alreadyUser = await UserModel.findOne({ where: { username } });
    return alreadyUser;
  }

  /**
   * Finds the user's username if he/she exists.
   * @param {string} id The user's username.
   * @param {string} pwd The user's username.
   * @returns {object} The users's data.
   */
  static async updateUserPassword(id, { password }) {
    const hashedPwd = Hasher.hashPassword(password);
    const updatedUser = await UserModel.update({ password: hashedPwd }, { where: { id } });
    return updatedUser;
  }

  /**
   * Saves the user in the DB.
   * @param {object} user The request sent by a user.
   * @returns {object} The users's data.
   */
  static async saveUser(user) {
    const acceptedUser = await UserModel.create({
      name: user.name,
      gender: user.gender,
      email: user.email,
      username: user.username,
      password: Hasher.hashPassword(user.password),
      birthdate: user.birthdate,
      preferredLanguage: user.preferredLanguage,
      preferredCurrency: user.preferredCurrency,
      location: user.location,
      role: user.role,
      department: user.department,
      lineManager: user.lineManager,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fields:
      [
        'name',
        'gender',
        'email',
        'username',
        'password',
        'birthdate',
        'preferredLanguage',
        'preferredCurrency',
        'location',
        'role',
        'department',
        'lineManager',
        'createAt',
        'updatedAt'
      ]
    });

    return acceptedUser;
  }
}

export default AuthHelpers;
