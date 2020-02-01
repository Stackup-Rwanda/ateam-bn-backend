import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import dotenv from 'dotenv';
import models from '../models';

dotenv.config();

const { User } = models;
passport.use(new FacebookStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL
},
(accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
  User.create({
    name: profile.displayName,
    fb_id: profile.id
  });
}));
