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
async (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  cb(null, profile);
  const { id } = profile;
  await User.findAll({

    where: { google_id: id }
  });


  if (!User.length) {
    await User.create({
      name: profile.displayName,
      google_id: profile.id

    });


  // eslint-disable-next-line block-spacing
  }
}));
