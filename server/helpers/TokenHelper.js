import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import importInsertToken from './authHelpers';
import models from '../models';

const { Token } = models;

dotenv.config();

/**
 * This class contains.
 * three methods, one to help hashing password (hashPassword).
 * other the second to retrieve hashed password.
 * and the lastone for generating token.
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
  static async generateToken(id, username, email, role, isVerified) {
    const userTokenExists = await Token.findOne({ where: { userId: id } });
    if (userTokenExists) {
      return userTokenExists.value;
    }
    const generatedToken = jwt.sign({
      id, username, email, role, isVerified
    }, process.env.SECRET_KEY);
    importInsertToken.insertGeneratedToken(generatedToken, id);
    return generatedToken;
  }
}
export default TokenHelper;
