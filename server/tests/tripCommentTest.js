import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import usersTester from './mochData/users';
import { jajaTrip } from './mochData/trips';

chai.use(chaiHttp);
const router = () => chai.request(app);

let userToken;
let savedTrip;
let savedComment;

describe('Test for Creating a trip comment, endpoint', () => {
  it(
    "should confirm user email before accessing the account, to test it",
    mochaAsync(async () => {
      const res = await router()
        .get(`/api/user/${usersTester[2].email}/confirm`);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
    })
  );

  it(
    "should signin before making any request, to test it",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/auth/signin')
        .send({ email: usersTester[2].email, password: usersTester[3].password });
      userToken = res.body.data.token;
    })
  );

  it(
    'should create a new one way trip, to test it',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trip/One-Way')
        .set('token', userToken)
        .send(jajaTrip);
      savedTrip = res.body.data;
    })
  );

  it(
    "should create a trip comment",
    mochaAsync(async () => {
      const res = await router()
        .post(`/api/Trips/${savedTrip.id}/Comment`)
        .set('token', userToken)
        .send({ comment: 'First Comment' });
      savedComment = res.body.data;
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    })
  );

  it(
    "should not create a trip comment, because of bad data",
    mochaAsync(async () => {
      const res = await router()
        .post(`/api/Trips/${savedTrip.id}/Comment`)
        .set('token', userToken);
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should not create a trip comment, because of bad data in URL",
    mochaAsync(async () => {
      const res = await router()
        .post(`/api/Trips/  ${savedTrip.id}/Comment`)
        .set('token', userToken)
        .send({ comment: 'First Comment' });
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should not create a trip comment, because of bad URL (contains string)",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trips/3sfa24/Comment')
        .set('token', userToken)
        .send({ comment: 'First Comment' });
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should not create a trip comment, because of unknown trip id",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trips/100000/Comment')
        .set('token', userToken)
        .send({ comment: 'First Comment' });
      expect(res.body.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should update a trip comment",
    mochaAsync(async () => {
      const res = await router()
        .patch(`/api/Comments/${savedComment.id}/update`)
        .set('token', userToken)
        .send({ comment: 'updated Comment' });
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    })
  );

  it(
    "should not update a trip comment, because of bad data",
    mochaAsync(async () => {
      const res = await router()
        .patch(`/api/Comments/${savedComment.id}/update`)
        .set('token', userToken);
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should not update a trip comment, because of bad data in URL (contains some space)",
    mochaAsync(async () => {
      const res = await router()
        .patch(`/api/Comments/  ${savedComment.id}/update`)
        .set('token', userToken)
        .send({ comment: 'updated Comment' });
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should not update a trip comment, because of unknown trip comment id",
    mochaAsync(async () => {
      const res = await router()
        .patch(`/api/Comments/10000000/update`)
        .set('token', userToken)
        .send({ comment: 'updated Comment' });
      expect(res.body.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should retrieve all trip comments",
    mochaAsync(async () => {
      const res = await router()
        .get(`/api/Trips/${savedTrip.id}/Comments`)
        .set('token', userToken);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('array');
    })
  );

  it(
    "should not retrieve trip comments, because of bad data in URL (contains some space)",
    mochaAsync(async () => {
      const res = await router()
        .get(`/api/Trips/  ${savedTrip.id}/Comments`)
        .set('token', userToken);
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should not retrieve trip comments, because of unknown trip comment id",
    mochaAsync(async () => {
      const res = await router()
        .get(`/api/Trips/900000/Comments`)
        .set('token', userToken);
      expect(res.body.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should delete a trip comment",
    mochaAsync(async () => {
      const res = await router()
        .delete(`/api/Comments/${savedComment.id}/delete`)
        .set('token', userToken);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    })
  );

  it(
    "should not delete a trip comment, because of bad data in URL (contains some space)",
    mochaAsync(async () => {
      const res = await router()
        .delete(`/api/Comments/  ${savedComment.id}/delete`)
        .set('token', userToken);
      expect(res.body.status).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );

  it(
    "should not delete a trip comment, because of unknown trip comment id",
    mochaAsync(async () => {
      const res = await router()
        .delete(`/api/Comments/${savedComment.id}/delete`)
        .set('token', userToken);
      expect(res.body.status).to.equal(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
});
