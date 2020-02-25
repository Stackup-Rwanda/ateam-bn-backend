import dotenv from 'dotenv';
import Auth from '../helpers/TokenHelper';
import users from '../helpers/authHelpers';
import RequestHelper from '../helpers/requestHelper';
import RatingHelper from '../helpers/ratingHelper';

dotenv.config();

const validateToken = async (req, res, next) => {
  try {
    if (!req.headers.token) {
      return res.status(401).send({
        status: 401,
        error: 'Please provide a token first',
      });
    }
    const { token } = req.headers;
    const decoded = Auth.decodedToken(token, process.env.SECRET_KEY);
    req.requesterUser = decoded;
    const doesUserExists = await users.userExists('email', req.requesterUser.email);
    if (!doesUserExists) {
      return res.status(401).send({
        status: 401,
        error: 'Sign up first please',
      });
    }
    const trip = await RequestHelper.findTripRequest(parseInt(req.params.id, 10), req.requesterUser.id);
    if (!trip) {
      return res.status(403).send({
        status: 403,
        error: 'You are not allowed to rate this place because you do not have a trip request for this place',
      });
    }
    if (trip.status !== 'Approved') {
      return res.status(403).send({
        status: 403,
        error: 'You are not allowed to rate the place when the trip request is not approved',
      });
    }

    const rated = await RatingHelper.findRatedRating(req.requesterUser.id, parseInt(req.params.id, 10));

    if (rated) {
      return res.status(403).send({
        status: 403,
        error: 'You are not allowed to rate more than once',
      });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: 'Auth failed',
    });
  }
};

export default validateToken;
