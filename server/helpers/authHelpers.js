import UserModel from '../models/user';

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the user's data
 */
class AuthHelpers {
  /**
   * Finds the user if he/she exists.
   * @param {string} email The user's email.
   * @returns {object} The users's data.
   */
  static async alreadyExists(email) {
    const user = await UserModel.findOne({ where: { email } });
    return user;
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
      password: user.password,
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
