import http from 'chai-http';
import Browser from 'zombie';
import dotenv from 'dotenv';
import chai, { expect } from 'chai';
import app from '../index';

dotenv.config();
const router = () => chai.request(app);
chai.should();
chai.use(http);
Browser.localhost('facebook.com', 3000);

describe('User login via facebook', () => {
  const browser = new Browser();

  before(() => browser.visit('/api/auth/facebook'));

  describe('submits form', (done) => {
    before(() => {
      browser.fill('input[name="email"]', process.env.facemail)
        .then(() => browser.fill('input[name="password"]', process.env.password))
        .then(() => browser.pressButton('Log in', done));
    });

    it('should be successful', () => {
      browser.assert.success();
    });

    it('should see welcome page', () => {
      browser.assert.text('title', "Injira kuri Facebook | Facebook");
    });

    it('should receive data from facebook', () => {
      router()
        .get('/api/auth/facebook/callback')
        .end((error, res) => {
          expect(res.profile.provider).to.equal('facebook');
          expect(res.profile.id).to.equal('2802182399866874');
          expect(res.profile.username).to.equal(undefined);
          expect(res.profile.dotenv.displayName).to.equal('Izabayo Johnson Jonas');
          expect(res.profile.name.familyName).to.equal(undefined);
          expect(res.profile.name.givenName).to.equal(undefined);
          expect(res.profile.middleName).to.equal(undefined);
          expect(res.profile.gender).to.equal(undefined);
          expect(res.profileUrl).to.equal(undefined);
          expect(res.body.status).to.be.equal(200);
          expect(res.body).to.have.property('message');
          done(error, res);
        });
    });
  });
});


// describe('User login via google', () => {
//   const browser = new Browser();

//   before(() => browser.visit('/api/auth/google'));

//   describe('submits form from google', (done) => {
//     before(() => {
//       browser.fill('input[name="email"]', process.env.email)
//         .then(() => browser.fill('input[name="password"]', process.env.google_password))
// .then(() => browser.pressButton('Sign in', done));
//     });

//     it('should be successful on goole', () => {
//       browser.assert.success();
//     });

//     it('should see welcome page on google', () => {
//       browser.assert.text('title', "Sign in with Google");
//     });

//     it('should receive data from google', () => {
//       router()
//         .get('/api/auth/google/callback')
//         .end((error, res) => {
//           // e
//           expect(res.profile.id).to.equal('117177803931364311344');
//           expect(res.profile.dotenv.displayName).to.equal('Izabayo Jonas');
//           expect(res.profile.name.familyName).to.equal('Jonas');
//           expect(res.profile.name.givenName).to.equal('Izabayo');
//           expect(res.profile.photos.value).to.equal('https://lh5.googleusercontent.com/-F6_0fxWeJg8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfVbD8hmbag9C--28VZ4c99RARgsA/photo.jpg');
//           expect(res.profile.locale).to.equal('en-GB');
//           expect(res.body.status).to.be.equal(200);
//           expect(res.body).to.have.property('message');
//           done(error, res);
//         });
//     });
//   });
// });

describe("google", () => {
  const url = '/api/auth/google';
  const browser = new Browser();

  it("should visit the site and see the login form", (next) => {
    browser.visit(url, (err) => {
      expect(Browser.success).to.equal();
      next();
    });
  });
});
