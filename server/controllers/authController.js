import TokenHelper from '../helpers/TokenHelper';
import AuthHelpers from '../helpers/authHelpers';
import { sendmail } from '../helpers/email';
import passwordHashHelper from '../helpers/passwordHashHelper';

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
    req.body.role = 'Requester';
    req.body.isVerified = false;
    req.body.rememberMe = false;
    req.body.lineManager = 3;
    const {
      username, email, role, isVerified, createdAt
    } = req.body;
    const savedUser = await AuthHelpers.saveUser(req.body);
    await sendmail(savedUser.email, savedUser.name);
    return res.status(201).json({
      status: 201,
      message: 'User was created successfully, Verify your email to confirm registration',
      data: {
        token: await TokenHelper.generateToken(savedUser.id, username, email, role, isVerified),
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
   * This method handle the sign request.
   * @param {object} req The user's request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async signIn(req, res) {
    const emailExists = await AuthHelpers.userExists('email', req.body.email);
    if (emailExists) {
      if (emailExists.isVerified === false) {
        return res.status(401).json({
          status: 401,
          error: 'Please confirm your email before logging in!'
        });
      }
      const passwordExist = await passwordHashHelper
        .checkPassword(req.body.password, emailExists.password);
      if (passwordExist) {
        return res.status(200).json({
          status: 200,
          message: 'user successfully logged In',
          data: {
            token: await TokenHelper.generateToken(
              emailExists.id,
              emailExists.username,
              emailExists.email,
              emailExists.role,
              emailExists.isVerified
            ),
            userData: {
              id: emailExists.id,
              name: emailExists.name,
              username: emailExists.username,
              email: emailExists.email,
              role: emailExists.role,
              lineManager: emailExists.lineManager
            }
          }
        });
      }
    }
    return res.status(401).json({
      status: 401,
      message: 'password or email is incorrect'
    });
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

  /**
   * This method handle the signup request.
   * @param {object} req The http request.
   * @param {object} res The response.
   * @returns {object} The status and some data of the user.
   */
  static async adminSignUp(req, res) {
    const emailExists = await AuthHelpers.userExists('email', req.body.email);
    const usernameExists = await AuthHelpers.userExists('username', req.body.username);

    if (emailExists || usernameExists) {
      return res.status(409).json({
        status: 409,
        error: 'This user already exists, use another email or username'
      });
    }
    req.body.isVerified = false;
    req.body.rememberMe = false;
    const {
      username, email, role, isVerified, createdAt
    } = req.body;
    const savedUser = await AuthHelpers.saveUser(req.body);
    await sendmail(savedUser.email, savedUser.name);
    return res.status(201).json({
      status: 201,
      message: 'User was created successfully, Verify your email to confirm registration',
      data: {
        token: await TokenHelper.generateToken(savedUser.id, username, email, role, isVerified),
        createdAt
      }
    });
  }
}

export default AuthController;
