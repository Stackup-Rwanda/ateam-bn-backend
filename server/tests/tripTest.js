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

chai.use(chaiHttp);
const router = () => chai.request(app);


describe('Test for create one way trip endpoint', () => {
  let token;
  beforeEach((done) => {
    chai
      .request(app)
      .post('/api/auth/signin')
      .send({
        email: 'dummy2@email.rw',
        password: '123456789'
      }).then((res) => {
        token = res.data.token;
        console.log(res);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
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
});
