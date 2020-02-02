import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import dotenv from 'dotenv';
import User from '../models/user';
import db from '../config/db';

dotenv.config();


passport.use(new FacebookStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL
},
async (accessToken, refreshToken, profile, cb) => {
  console.log(profile);
  cb(null, profile);

  const { id, displayName } = profile;
  await User.findAll({
    limit: 1,
    where: { fb_id: id }
  });
  if (!User.length) {
    await db.sync().then(() => {
      User.create({
        name: profile.displayName,
        fb_id: profile.id

      });
    });
    console.log(id);
  }
}));
