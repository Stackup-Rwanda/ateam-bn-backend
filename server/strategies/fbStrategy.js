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
async (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  cb(null, profile);

  const { id } = profile;
  await User.findAll({
    limit: 1,
    where: { fb_id: id }
  });
  if (!User.length) {
    await User.create({
      name: profile.displayName,
      fb_id: profile.id

    });
    console.log(id);
  }
}));
