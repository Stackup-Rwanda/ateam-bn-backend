import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import {
  oneWayTrip,
  incopreteWayTrip,
  incoDateWayTrip,
  incoloacationWayTrip,
  incoAccommodationWayTrip
} from './mochData/trips';
import usersTester from './mochData/users';

chai.use(chaiHttp);
const router = () => chai.request(app);

let mytoken;

describe('Test for create one way trip endpoint', () => {
  it(
    "should signin before making any request, to test it",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/auth/signin')
        .send(usersTester[6]);
      mytoken = res.body.data.token;
    })
  );
  it(
    'should create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(oneWayTrip);
      console.log(res.body);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('Trip was created successfully.');
      expect(res.body.data).to.be.an('object');
    })
  );
  it(
    'should not create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(oneWayTrip);
      expect(res.body.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip when data are incomplete',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(incopreteWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip if date is invalide',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(incoDateWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip if location is invalide',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(incoloacationWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip if accommodation is not from trip loacation',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trip')
        .set('token', mytoken)
        .send(incoAccommodationWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
});
