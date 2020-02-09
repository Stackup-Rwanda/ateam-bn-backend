import dotenv from 'dotenv';

import Auth from '../helpers/TokenHelper';
import users from '../helpers/authHelpers';

dotenv.config();

export default (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        status: 401,
        error: 'Please provide a token first',
      });
    }
    const token = req.headers.authorization;
    const decoded = Auth.decodedToken(token, process.env.SECRET_KEY);
    req.userData = decoded;
    if (!users.userExists('email', req.userData.email)) {
      return res.status(403).send({
        status: 403,
        error: 'Not Allowed'
      });
    }

    if (req.userData.role === 'Manager') {
      return next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: 401,
      error: 'Auth failed'
    });
  }
};
