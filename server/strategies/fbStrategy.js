import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import dotenv from 'dotenv';
import fbAuth from '../models/fbModel';
dotenv.config();




   passport.use(new FacebookStrategy({
    clientID: process.env.clientID,
     clientSecret: process.env.clientSecret,
     callbackURL: process.env.callbackURL
   },
   (accessToken, refreshToken, profile,email, cb)=> {
    console.log(profile.email);
    console.log(email)
   cb(null, profile, email);

//  connection.sync().then(()=>{
    
//          fbAuth.create({
//             fb_id: profile.id,
//             display_name: profile.displayName
//         }
    
//         ) ;
//     })

  
}
));




