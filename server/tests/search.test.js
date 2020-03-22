import chai from 'chai';
import http from 'chai-http';
import index from '../index';
import mochaAsync from '../helpers/mochaAsync';

const router = () => chai.request(index);
chai.use(http);
let currentToken;
let managerToken;
const { expect } = chai;
const realToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2lyYW1hdGEgS2FyZW4iLCJ1c2VybmFtZSI6ImtnaXIiLCJlbWFpbCI6IkthcmVuQGdtYWlsLmNvbSIsImlhdCI6MTU4MDgyMTI3OH0.AR-FqtlZ5-MnWqWZS-R-zjsiq6ingBz8b0RwvZ_GUSk';
const wrongToken = 'eyJhbGciOijIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltbXkgS2F5a2F5IiwidXNlcm5hbWUiOiJrYXkiLCJlbWFpbCI6IkprYXlAZ21haWwuY29tIiwiaWF0IjoxNTgwODIwNzM3fQ.jCVUdtDEMpcyliUcuwxGixSn2dcqoJ6xLaXEFswHfFI';
describe('running user search route', () => {
  it('User should login before search', async () => {
    const result = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'JkayOne2@gmail.com', password: '123456789' });
    currentToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it(
    'should not create a new trip if date is invalide',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips')
        .set('token', currentToken)
        .send({

          name: "jonas", passportId: "PC123777", tripType: "One-way", from: 2, to: [1], date: "2020-08-12T19:59:11Z", returnDate: "2020-12-12", reasons: "biryogo", accommodationId: 2, status: "Pending"
        });
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it('user should be able search data by status', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', currentToken)
      .send({ search: 'Pending' });
    result.should.have.status(200);
    result.body.should.have.property('data');
  });


  it('user should be able search data by date', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', currentToken)
      .send({ search: "2020-08-12T19:59:11Z" });
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('user should not be able search data by wrong date', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', currentToken)
      .send({ search: "2020-03-12T19:59:11Z" });
    result.should.have.status(404);
    result.body.should.have.property('error');
  });
  it('user should be able search data by origin', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', currentToken)
      .send({ search: 1 });
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
  it('user should be not able to search unavailable data', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', currentToken)
      .send({ search: 1754 });
    result.should.have.status(404);
    result.body.should.have.property('error', "request with given input was not found");
  });
  it('user should be able search data by integer', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', realToken)
      .send({ search: 1 });
    result.should.have.status(401);
    result.body.should.have.property('error');
  });
});

describe('running manager search route', () => {
  it('Manager should login before search', async () => {
    const result = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'nigorjeanluc@gmail.com', password: 'secret123' });
    managerToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it('Manager should be able search data by status', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', wrongToken)
      .send({ search: 'Pending' });
    result.should.have.status(400);
    result.body.should.have.property('error');
  });
  it('Manager should be able search data by status', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', managerToken)
      .send({ search: 'Pending' });
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
  it('Manager should be able search data by date', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', managerToken)
      .send({ search: "2020-08-12T19:59:11Z" });
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
  it('Manager should not be able search data by wrong date', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', managerToken)
      .send({ search: "2020-05-12T19:59:11Z" });
    result.should.have.status(404);
    result.body.should.have.property('error');
  });
  it('manager should be able search data by origin, destination, tripId, userId, ', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', managerToken)
      .send({ search: 1 });
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
  it('manager should be not able to search unavailable data', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', managerToken)
      .send({ search: 17454 });
    result.should.have.status(404);
    result.body.should.have.property('error');
  });
  it('requester should not be able search data of manager ', async () => {
    const result = await chai
      .request(index)
      .post('/api/search/request')
      .set('token', realToken)
      .send({ search: 1 });
    result.should.have.status(401);
    result.body.should.have.property('error');
  });
});
