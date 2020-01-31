import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import dotenv from 'dotenv';
import models from '../models';
<<<<<<< HEAD
import strategyGenerator from '../helpers/strategyHelper';
=======
>>>>>>> ft-login-via-facebook-and-google-170766085(facebook login):

dotenv.config();

const { User } = models;
<<<<<<< HEAD
passport.use(new FacebookStrategy(
  strategyGenerator(process.env.clientID, process.env.clientSecret, process.env.callbackURL),
  (accessToken, refreshToken, profile, cb) => {
    cb(null, profile);
    User.create({
      name: profile.displayName,
      fb_id: profile.id
    });
  }
));
=======

passport.use(new FacebookStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL
},
(accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  cb(null, profile);
  User.create({
    name: profile.displayName,
    fb_id: profile.id
  });
  console.log(id);
}));
>>>>>>> ft-login-via-facebook-and-google-170766085(facebook login):
