import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user'
import db from '../config/db';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.gcallbackURL
  },
  async(accessToken, refreshToken, profile, cb)=> {
 console.log(profile);
    cb( null,profile);
    const {id, givenName,familyName}= profile;
    await User.findAll({
        
        where: {google_id: id }
      });
     

      if(!User.length){
      await db.sync().then(()=>{ User.create({
          name: profile.displayName,
          google_id: profile.id

        });})
        
  }})
  
);