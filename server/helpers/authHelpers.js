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
   * @param {string} email The user's email.
   * @returns {object} The users's data.
   */
  static async emailExists(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }


  /**
   * Finds the user's username if he/she exists.
   * @param {string} username The user's username.
   * @returns {object} The users's data.
   */
  static async usernameExists(username) {
    const alreadyUser = await User.findOne({ where: { username } });
    return alreadyUser;
  }

  /**
   * Saves the user in the DB.
   * @param {object} user The request sent by a user.
   * @returns {object} The users's data.
   */
  static async saveUser(user) {
    const acceptedUser = await User.create({
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
