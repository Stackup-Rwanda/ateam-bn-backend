import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import dotenv from 'dotenv';
import models from '../models';

dotenv.config();

const { User } = models;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.gcallbackURL
},
(accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
  User.create({
    name: profile.displayName,
    google_id: profile.id

  });
}));
