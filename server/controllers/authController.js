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
    const userExists = await AuthHelpers.alreadyExists(req.body.email);

    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This user already exists'
      });
    }

    const savedUser = await AuthHelpers.saveUser(req.body);

    console.log(savedUser);
    return res.status(201).json({
      status: 201,
      message: 'User was created successfully',
      data: {
        name: savedUser.name,
        email: savedUser.email,
        username: savedUser.username,
        createdAt: savedUser.createdAt
      }
    });
  }
}

export default AuthController;
