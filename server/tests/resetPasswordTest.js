import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import usersTester from './mochData/users';

chai.use(chaiHttp);
const router = () => chai.request(app);

let thatUser;
let userObject;

describe('Test for sending email endpoint', () => {
  it(
    "should create a new user account with appropriate request",
    mochaAsync(async () => {
      const res = await router()
        .post("/api/auth/signup")
        .send(usersTester[2]);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
      thatUser = res.body.data;
    })
  );

  it(
    "should send an email to a user",
    mochaAsync(async () => {
      const { email } = thatUser;
      const res = await router()
        .post("/api/auth/reset-password")
        .send({ email });
      const { userDetails } = await res.body;
      userObject = userDetails;
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.userDetails).to.be.an('object');
    })
  );

  it(
    "shouldn't send an email to a user, Because of invalid email",
    mochaAsync(async () => {
      const res = await router()
        .post("/api/auth/reset-password")
        .send({ email: 'asdfsdf' });
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "shouldn't send an email to a user, Because of unsaved email",
    mochaAsync(async () => {
      const res = await router()
        .post("/api/auth/reset-password")
        .send({ email: 'theFakeEmail@fake.com' });
      expect(res.body.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should update user password",
    mochaAsync(async () => {
      const { password, confirmPassword } = usersTester[3];
      const res = await router()
        .patch(`/api/auth/update-password/${userObject.id}/${userObject.token}`)
        .send({ password, confirmPassword });
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.userDetails).to.be.an('object');
    })
  );

  it(
    "shouldn't update password, Because of unknown user",
    mochaAsync(async () => {
      const { password, confirmPassword } = usersTester[3];
      const res = await router()
        .patch(`/api/auth/update-password/badId/${userObject.token}`)
        .send({ password, confirmPassword });
      expect(res.body.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "shouldn't update user password, Because of uncomplete data",
    mochaAsync(async () => {
      const { confirmPassword } = usersTester[3];
      const res = await router()
        .patch(`/api/auth/update-password/${userObject.id}/${userObject.token}`)
        .send({ confirmPassword });
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "shouldn't update user password, Because of unmatch password",
    mochaAsync(async () => {
      const { password, confirmBadPassword } = usersTester[3];
      const res = await router()
        .patch(`/api/auth/update-password/${userObject.id}/${userObject.token}`)
        .send({ password, confirmPassword: confirmBadPassword });
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "shouldn't update user password, Because of bad Token",
    mochaAsync(async () => {
      const { password, confirmPassword, badToken } = usersTester[3];
      const res = await router()
        .patch(`/api/auth/update-password/${userObject.id}/${badToken}`)
        .send({ password, confirmPassword });
      expect(res.body.status).to.equal(401);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
});
