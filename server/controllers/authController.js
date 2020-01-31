import TokenHelper from '../helpers/TokenHelper';
import AuthHelpers from '../helpers/authHelpers';

/**
 * This class contains all methods
 * required to handle
 * signup and login endpoints' request.
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
<<<<<<< HEAD
        token: TokenHelper.generateToken(savedUser.id, savedUser.email),
=======
        name: savedUser.name,
        email: savedUser.email,
        username: savedUser.username,
        password: savedUser.password,
        isVerified: savedUser.isVerified,
>>>>>>> ft(signup-endpoint): add is Verified attribute
        createdAt: savedUser.createdAt
      }
    });
  }
}

export default AuthController;
