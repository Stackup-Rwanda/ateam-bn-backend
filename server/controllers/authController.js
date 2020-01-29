import db from '../config/db';
import UserModel from '../models/user';

class AuthController {
  static async signUp (req, res) {
    const {email} = req.body;
    const userExists = await UserModel.findOne({where: {email: email}});
    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This user already exists'
      });
    }
    console.log(userExists);
    return res.sendStatus(200);
  }
}

export default AuthController;
