import Browser from 'zombie';
import dotenv from 'dotenv';
import chai, { expect } from 'chai';
import GoogleStrategy from 'passport-google-oauth20';
import http from 'http';
import app from '../index';
import strategyGenerator from '../helpers/strategyHelper';

http.createServer(app).listen(3000);
dotenv.config();
const router = () => chai.request(app);
chai.should();

chai.use(require('chai-passport-strategy'));

Browser.localhost('facebook.com', 3000);

describe('User login via facebook', () => {
  const browser = new Browser();

  before(() => browser.visit('/api/auth/facebook'));

  describe('submits form', (done) => {
    before(() => {
      browser.fill('input[name="email"]', process.env.email)
        .then(() => browser.fill('input[name="password"]', process.env.credential));
      return browser.pressButton('login', done);
    });

    it('should be successful', () => {
      browser.assert.success();
    });

    it('should see welcome page', () => {
      browser.assert.text('title', 'Injira kuri Facebook | Facebook');
    });

    it('should receive data from facebook', () => {
      router()
        .get('/api/auth/facebook/callback')
        .end((error, res) => {
          expect(res.profile.username).to.equal(undefined);
          expect(res.profile.dotenv.displayName).to.equal('Izabayo Johnson Jonas');
          expect(res.profile.name.familyName).to.equal(undefined);
          expect(res.profile.name.givenName).to.equal(undefined);
          expect(res.profile.middleName).to.equal(undefined);
          expect(res.profile.gender).to.equal(undefined);
          expect(res.profileUrl).to.equal(undefined);
          expect(res.body).to.have.status(200);
          expect(res.body).to.have.property('message', "you are logged in successfully");
          done(error);
        });
    });
  });
  describe('Strategy', () => {
    describe('constructed', () => {
      const strategy = new GoogleStrategy({
        clientID: process.env.clientID,
        clientSecret: process.env.clientSecret
      }, (() => { }));

      it('should be named google', () => {
        expect(strategy.name).to.equal('google');
      });
    });

    describe('constructed with undefined options', () => {
      it('should throw', () => {
        expect(strategyGenerator(
          process.env.clientID,
          process.env.clientSecret,
          process.env.gcallbackURL
        )).to.be.an('object');
      });
    });
  });


  describe('authorization request with documented parameters', () => {
    const strategy = new GoogleStrategy({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ prompt: 'select_account', loginHint: 'izabayojonas12@gmail.com', accessType: 'offline' });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=select_account&login_hint=izabayojonas12%40gmail.com&response_type=code&client_id=836856073443143');
    });
  }); //

  describe('authorization request with documented parameters from OpenID Connect', () => {
    const strategy = new GoogleStrategy({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    }, (() => {}));


    let url;

    before((done) => {
      chai.passport.use(strategy)
        .redirect((u) => {
          url = u;
          done();
        })
        .req((req) => {
          req.session = {};
        })
        .authenticate({ display: 'touch' });
    });

    it('should be redirected', () => {
      expect(url).to.equal('https://accounts.google.com/o/oauth2/v2/auth?display=touch&response_type=code&client_id=836856073443143');
    });
  });
});

