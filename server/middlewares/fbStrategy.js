import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import dotenv from 'dotenv';
import strategyGenerator from '../helpers/strategyHelper';

dotenv.config();

passport.use(new FacebookStrategy(
  strategyGenerator(process.env.clientID, process.env.clientSecret, process.env.callbackURL),
  (accessToken, refreshToken, profile, cb) => cb(null, profile)
));
