import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import usersTester from './mochData/users';
import commentTester from './mochData/tripComment';
import {
  jajaTrip,
} from './mochData/trips';

chai.use(chaiHttp);
const router = () => chai.request(app);

let userObject;
let userToken;
let userSavedTrip;
let userSavedComment;

describe('Test for Creating a trip comment, endpoint', () => {
  it(
    "should confirm user email before accessing the account",
    mochaAsync(async () => {
      const res = await router()
        .put(`/api/user/${usersTester[2].email}/confirm`);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
    })
  );

  it(
    "should signin before making any request",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/auth/signin')
        .send({ email: usersTester[2].email, password: usersTester[3].password });
      userToken = res.body.data.token;
    })
  );

  it(
    'should create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trip/One-Way')
        .set('token', userToken)
        .send(jajaTrip);
      userSavedTrip = res.body.data;
    })
  );

  it(
    "should create a trip comment",
    mochaAsync(async () => {
      const res = await router()
        .post(`/api/Trips/${userSavedTrip.id}/Comment`)
        .set('token', userToken)
        .send({ comment: 'First Comment' });
      userSavedComment = res.body.data.id;
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    })
  );

  it(
    "should not create a trip comment, because of bad data in URL",
    mochaAsync(async () => {
      const res = await router()
        .post(`/api/Trips/${userSavedTrip.id}/Comment`)
        .set('token', userToken)
        .send({ comment: 'First Comment' });
      console.log(res.body);
      // expect(res.body.status).to.equal(201);
      // expect(res.body).to.be.an('object');
      // expect(res.body.message).to.be.a('string');
      // expect(res.body.data).to.be.an('object');
    })
  );

  it(
    "should not create a trip comment, because of bad data",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trips/ /Comment')
        .set('token', userToken);
      console.log(res.body);
      // expect(res.body.status).to.equal(201);
      // expect(res.body).to.be.an('object');
      // expect(res.body.message).to.be.a('string');
      // expect(res.body.data).to.be.an('object');
    })
  );
});
