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
   * Hashs the password.
   * @param {string} password The user's password.
   * @returns {string} The users's hashed password.
   */
  static generateResetPasswordToken({
    id, email, password, createdAt,
  }) {
    const secrect = `${password}_${createdAt}`;
    return jwt.sign({ id, email, password }, secrect, { expiresIn: 3600 });
  }

  /**
   * Hashs the password.
   * @param {string} token The user's token.
   * @param {string} secrectKey The secret key.
   * @returns {string} The users's hashed password.
   */
  static decodedToken(token, secrectKey) {
    const isToken = jwt.verify(token, secrectKey);
    return isToken;
  }

  /**
   * Hashs the password for signup and login response.
   * @param {integer} id The user's id.
   * @param {string} username The user's username.
   * @param {string} email The user's email.
   * @param {string} role The user's role.
   * @param {string} isVerified The user's isVerified.
   * @returns {string} The users's hashed password.
   */
  static generateToken(id, username, email, role, isVerified) {
    return jwt.sign(
      {
        id,
        username,
        email,
        role,
        isVerified
      }, process.env.SECRET_KEY
    );
  }
}
export default TokenHelper;
