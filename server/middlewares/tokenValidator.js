import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';

const { User } = models;
const { Token } = models;
dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const verify = jwt.verify(req.header('token'), process.env.JWT_PRIVATE_KEY);
    req.verifiedData = verify;
    const userExists = await User.findOne({
      where: { email: verify.email }
    });
    const tokenExists = await Token.findOne({
      where: { value: req.header('token') }
    });
    if (userExists) {
      if (tokenExists) {
        console.log('passed');
        return next();
      }
      return res.status(401).json({ status: 401, error: 'Token not registered for session. Sign in and try again.' });
    }
    return res.status(401).json({ status: 401, error: 'User not recognised. Please create account and try again.' });
  } catch (error) {
    return res.status(400).json({ status: 400, error: 'Malformed / Incorrect security token. Check token and try again.' });
  }
};

export default verifyToken;
