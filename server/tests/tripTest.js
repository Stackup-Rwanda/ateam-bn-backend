import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import {
  oneWayTrip,
  incopreteWayTrip,
  incoDateWayTrip,
  incoloacationWayTrip,
  incoAccommodationWayTrip,
  oneWayTrip2
} from './mochData/trips';

chai.use(chaiHttp);
const router = () => chai.request(app);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkdW1teTJAZW1haWwucnciLCJyb2xlIjoiU3VwZXIgQWRtaW5pc3RyYXRvciIsImlhdCI6MTU4MDk1NzUwNH0.iOPzeyAUNCawgWmMfV9KCAbdAIpLdqHP8e9xVxZv6kA';

describe('Test for create one way trip endpoint', () => {
  it(
    'should create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trip/One-Way')
        .set('token', token)
        .send(oneWayTrip);
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
        .post('/api/Trip/One-Way')
        .set('token', token)
        .send(oneWayTrip);
      expect(res.body.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trip/One-Way')
        .set('token', token)
        .send(incopreteWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new one way trip if date is invalide',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trip/One-Way')
        .set('token', token)
        .send(incoDateWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.equal('This date is in the past, please choose a future date.');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new one way trip if location is invalide',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trip/One-Way')
        .set('token', token)
        .send(incoloacationWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.equal('choose proper location.');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new one way trip if accommodation is not from trip loacation',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trip/One-Way')
        .set('token', token)
        .send(incoAccommodationWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.equal('choose proper accommodation.');
      expect(res.body.error).to.be.a('string');
    })
  );
  it('User should  be able to set if whether they want their profile to be remembered or not', async () => {
    const res = await chai
      .request(app)
      .post('/api/Trip/One-Way')
      .set('token', token)
      .send(oneWayTrip2);
    res.should.have.status(201);
    res.body.should.be.an('object');
  });
});
