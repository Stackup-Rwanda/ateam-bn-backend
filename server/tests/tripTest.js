import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sequelize from '../config/db';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import {
  oneWayTrip,
  incopreteWayTrip
} from './mochData/trips';

chai.use(chaiHttp);
const router = () => chai.request(app);

after(async () => {
  await sequelize.close();
});

describe('Test for create one way trip endpoint', () => {
  it(
    'should create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trip/One-Way')
        .send(oneWayTrip);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.equal('Trip was created successfully');
      expect(res.body.data).to.be.an('object');
    })
  );
  it(
    'should not create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/Trip/One-Way')
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
        .send(incopreteWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
});
