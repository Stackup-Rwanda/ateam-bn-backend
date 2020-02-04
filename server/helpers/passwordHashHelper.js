import bcrypt from 'bcrypt-nodejs';

/**
 * This class contains
 * two methods, one to help hashing password (hashPassword)
 * and the second to retrieve hashed password
 */
class Hasher {
  /**
   * Hashs the password.
   * @param {string} password The user's password.
   * @returns {string} The users's hashed password.
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
}

export default Hasher;
