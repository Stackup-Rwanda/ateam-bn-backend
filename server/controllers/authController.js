import TokenHelper from '../helpers/TokenHelper';
/* eslint-disable no-empty */
/* eslint-disable require-jsdoc */
import AuthHelpers from '../helpers/authHelpers';
import sendmail from '../helpers/email';

/**
 * This class contains all methods
 * required to handle
 * signup and login and logout endpoints' request.
 */
class AuthController {
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async signUp(req, res) {
    const emailExists = await AuthHelpers.userExists('email', req.body.email);
    const usernameExists = await AuthHelpers.userExists('username', req.body.username);

    if (emailExists || usernameExists) {
      return res.status(409).json({
        status: 409,
        error: 'This user already exists, use another email or username'
      });
    }
    const {
      id, email, role, isVerified, createdAt
    } = req.body;
    const savedUser = await AuthHelpers.saveUser(req.body);
    await sendmail(savedUser.email, savedUser.name);
    return res.status(201).json({
      status: 201,
      message: 'User was created successfully, Verify your email to confirm registration',
      data: {
        token: TokenHelper.generateToken(id, email, role, isVerified),
        createdAt
      }
    });
  }
  /**
   * This method handle the signup request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */

  static async confirmation(req, res) {
    const checkConfirmation = await AuthHelpers.userExists('email', req.params.email);
    if (!checkConfirmation) {
      return res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }
    const result = await AuthHelpers.confirm(req.params.email);
    if (result) {
      return res.status(200).json({
        status: 200,
        message: 'Email has successfully been verified. You can now login'
      });
    }
  }
  
  /**
   * This method handle the logout endpoint.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and message.
   * */
  static async logout(req, res) {
    try {
      await AuthHelpers.deleteValidToken(req.header('token'));
      return res.status(200).json({
        status: 200,
        message: `${req.user.username} successfully signed out.`
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: ' something goes wrong ',
        error: error.message
      });
    }
}

export default AuthController;
