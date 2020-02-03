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
   * @param {string} password The user's password.
   * @returns {string} The users's hashed password.
   */
  static generateToken(id, email, role) {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: 3600 });
  }

  /**
   * Hashs the password.
   * @param {string} password The user's password.
   * @returns {string} The users's hashed password.
   */
  static generateResetPasswordToken({
    id, email, password, createdAt,
  }) {
    const secrect = `${password}_${createdAt}`;
    return jwt.sign({ id, email }, secrect, { expiresIn: 3600 });
  }
  /**
   * Hashs the password.
   * @param {string} token The user's token.
   * @param {string} secrectKey The secret key.
   * @returns {string} The users's hashed password.
   */
  static decodedToken(token, secrectKey) {
    return jwt.verify(token, secrectKey);
  }
}
export default TokenHelper;
