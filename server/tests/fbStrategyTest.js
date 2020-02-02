// import http from 'chai-http';
// import chai, { expect } from 'chai';
// import FacebookStrategy from 'passport-facebook';
// import dotenv from 'dotenv';
// import app from '../index';

// chai.should();
// chai.use(http);

// dotenv.config();

// // var FacebookStrategy = require('../lib/strategy');


// describe('Strategy#userProfile', () => {
//   describe('fetched from default endpoint', () => {
//     const strategy = new FacebookStrategy({
//       clientID: process.env.clientID,
//       clientSecret: process.env.clientSecret
//     }, (() => {}));

//     strategy._oauth2.get = function (url, accessToken, callback) {
//       if (url != 'https://graph.facebook.com/v3.2/me') { return callback(new Error('incorrect url argument')); }
//       if (accessToken!= 'token') { return callback(new Error('incorrect token argument')); }

//       const body = '{"id":"2802182399866874","name":"Izabayo Johnson Jonas","first_name":undefined,"last_name":undefined,"username":undefined,"gender":undefined,"link":"http:undefined}';
//       callback(null, body, undefined);
//     };


//     let profile;

//     before((done) => {
//       strategy.userProfile('token', (err, p) => {
//         if (err) { return done(err); }
//         profile = p;
//         done();
//       });
//     });

//     it('should parse profile', () => {
//       expect(profile.provider).to.equal('facebook');
//       expect(profile.id).to.equal('2802182399866874');
//       expect(profile.username).to.equal(undefined);
//       expect(profile.displayName).to.equal('Izabayo Johnson Jonas');
//       expect(profile.name.familyName).to.equal(undefined);
//       expect(profile.name.givenName).to.equal(undefined);
//       expect(profile.gender).to.equal(undefined);
//       expect(profile.profileUrl).to.equal(undefined);
//     //   expect(profile.emails).to.have.length(1);
//     //   expect(profile.emails[0].value).to.equal('jaredhanson@example.com');
//     //   expect(profile.photos).to.be.undefined;
//     });
//   });
// });
