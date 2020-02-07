import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import dotenv from 'dotenv';

dotenv.config();
passport.use(
  new FacebookStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: process.env.callbackURL,
    profileFields: ['id', 'displayName', 'email']
  },
  (accessToken, refreshToken, profile, cb) => {
    cb(null, profile);
    console.log(profile);
  })
);
