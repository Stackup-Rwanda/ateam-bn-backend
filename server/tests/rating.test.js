import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import Token from './mochData/mochToken';
import otherToken from './mochData/token';

const invalid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoiam9obmRvZUBlbWFpbC5jb20iLCJyb2xlIjoiTWFuYWdlciIsImlhdCI6MTUxNjIzOTAyMn0.v3YzUSxT1SHGIE35qhRAiOdGWFXV2ir4ntlWF5_U6io';

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('Test suite for testing rating endpoint', () => {
  before(mochaAsync(async () => {
    const res = await router()
      .post("/api/auth/signin")
      .send({ email: 'dummy2@email.rw', password: '123456789' });
    Token = res.body.data.token;
  }));
  it('should not rate the accommodation with unknown accommodation id', async () => {
    const res = await router().patch('/api/ratings/145447')
      .set('token', Token).send({ stars: 4 });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(403);
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.equals('You are not allowed to rate this place because you do not have a trip request for this place');
  });
  it('should not rate the accommodation with no token', async () => {
    const res = await router().patch('/api/ratings/145447')
      .send({ stars: 4 });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(401);
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.equals('Please provide a token first');
  });
  it('should not rate the accommodation with unknown user', async () => {
    const res = await router().patch('/api/ratings/1')
      .set('token', invalid).send({ stars: 4 });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(401);
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.equals('Sign up first please');
  });
  it('should not rate the accommodation with invalid token', async () => {
    const res = await router().patch('/api/ratings/145447')
      .set('token', otherToken.invalidToken).send({ stars: 4 });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(401);
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.equals('Auth failed');
  });
  it('should rate the accommodation with no problems', async () => {
    const res = await router().patch('/api/ratings/1')
      .set('token', Token).send({ stars: 5 });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(200);
    expect(res.body.message).to.be.a('string');
    expect(res.body.data).to.be.an('object');
    expect(res.body.data.rate).to.be.a('string');
  });
});
