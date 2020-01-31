import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * This class contains
 * two methods, one to help hashing password (hashPassword)
 * and the second to retrieve hashed password
 */
class TokenHelper {
  /**
   * Hashs the password for signup and login response.
<<<<<<< HEAD
   * @param {integer} id The user's id.
   * @param {string} email The user's email.
   * @param {string} role The user's role.
   * @param {string} isVerified The user's isVerified.
=======
   * @param {string} password The user's password.
   * @returns {string} The users's hashed password.
   */
  static generateToken(id, email) {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: 3600 });
  }

  /**
   * Hashs the password.
   * @param {string} password The user's password.
>>>>>>> ft(generate-jwt): add function to generate token
   * @returns {string} The users's hashed password.
   */
  static generateToken(id, email, role, isVerified) {
    return jwt.sign(
      {
        id,
        email,
        role,
        isVerified
      }, process.env.SECRET_KEY
    );
  }
}
export default TokenHelper;
