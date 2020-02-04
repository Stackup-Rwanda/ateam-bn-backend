import AuthHelpers from '../helpers/authHelpers';

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

    const savedUser = await AuthHelpers.saveUser(req.body);

    return res.status(201).json({
      status: 201,
      message: 'User was created successfully',
      data: {
        name: savedUser.name,
        email: savedUser.email,
        username: savedUser.username,
        password: savedUser.password,
        isVerified: savedUser.isVerified,
        createdAt: savedUser.createdAt
      }
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
      console.log(req.headers.authorization);
      await AuthHelpers.deleteValidToken(req.headers.authorization);
      return res.status(200).json({
        status: 200,
        message: ` Hey Joshua !! you are logged out successfully`
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: ' something goes wrong ',
        error: error.message
      });
    }
  }
}

export default AuthController;
