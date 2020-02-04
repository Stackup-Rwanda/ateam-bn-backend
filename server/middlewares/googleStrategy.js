import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import strategyGenerator from '../helpers/strategyHelper';

dotenv.config();
passport.use(new GoogleStrategy(
  strategyGenerator(process.env.G_CLIENT_ID, process.env.G_SECRET, process.env.gcallbackURL),
  (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }
));
