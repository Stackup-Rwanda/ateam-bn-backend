import dotenv from 'dotenv';

import Auth from '../helpers/TokenHelper';

dotenv.config();

export default (req, res, next) => {
  try {
    if (!req.headers.token) {
      return res.status(401).send({
        status: 401,
        error: 'Please provide a token first',
      });
    }
    const { token } = req.headers;
    const decoded = Auth.decodedToken(token, process.env.SECRET_KEY);
    req.userData = decoded;
    if (req.userData.role !== 'Super Administrator') {
      return res.status(401).send({
        status: 401,
        error: `Sorry! you don't have the permission`
      });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'Auth failed'
    });
  }
};