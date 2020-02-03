import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import dotenv from 'dotenv';
import models from '../models';
import strategyGenerator from '../helpers/strategyHelper';

dotenv.config();

const { User } = models;
passport.use(
  new FacebookStrategy(
    strategyGenerator(process.env.clientID, process.env.clientSecret, process.env.callbackURL),
    (accessToken, refreshToken, profile, cb) => {
      cb(null, profile);
      User.create({
        name: profile.displayName,
        fb_id: profile.id
      });
    }
  )
);
