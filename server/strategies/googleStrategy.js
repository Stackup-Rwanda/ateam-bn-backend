import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import models from '../models';
import strategyGenerator from '../helpers/strategyHelper';

dotenv.config();

const { User } = models;

passport.use(
  new GoogleStrategy(
    strategyGenerator(process.env.G_CLIENT_ID, process.env.G_SECRET, process.env.gcallbackURL),
    (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
      console.log(profile);
      User.create(
        {
          name: profile.displayName,
          google_id: profile.id
        }
      );
    }
  ));
