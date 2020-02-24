import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import token from './mochData/mochToken';
import otherTokens from './mochData/token';

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('Test suite for approving/rejecting trip requests', () => {
  it('should approve trip request if manager has user under his/her authority', async () => {
    const res = await router().patch('/api/request/1/approve')
      .set('token', token).send({ status: 'Approved' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(200);
    expect(res.body.message).to.be.a('string');
    expect(res.body.message).to.equals('This trip request was successfully approved');
    expect(res.body.data).to.be.an('object');
  });

  it('should approve trip request if manager has user under his/her authority', async () => {
    const res = await router().patch('/api/request/1/approve')
      .set('token', token).send({ status: 'Approved' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(200);
    expect(res.body.message).to.be.a('string');
    expect(res.body.message).to.equals('This trip request was successfully approved');
    expect(res.body.data).to.be.an('object');
  });

  it('should approve trip request if manager has user under his/her authority', async () => {
    const res = await router().patch('/api/request/1/approve')
      .set('token', token).send({ status: 'Approved' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(200);
    expect(res.body.message).to.be.a('string');
    expect(res.body.message).to.equals('This trip request was successfully approved');
    expect(res.body.data).to.be.an('object');
  });


  it('should approve trip request if manager has user under his/her authority', async () => {
    const res = await router().patch('/api/request/1/approve')
      .set('token', token).send({ status: 'Approved' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(200);
    expect(res.body.message).to.be.a('string');
    expect(res.body.message).to.equals('This trip request was successfully approved');
    expect(res.body.data).to.be.an('object');
  });


  it('should approve trip request if manager has user under his/her authority', async () => {
    const res = await router().patch('/api/request/1/approve')
      .set('token', token).send({ status: 'Approved' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(200);
    expect(res.body.message).to.be.a('string');
    expect(res.body.message).to.equals('This trip request was successfully approved');
    expect(res.body.data).to.be.an('object');
  });

  it('should reject trip request if manager has user under his/her authority', async () => {
    const res = await router().patch('/api/request/1/reject')
      .set('token', token).send({ status: 'Rejected' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(200);
    expect(res.body.message).to.be.a('string');
    expect(res.body.message).to.equals('This trip request has been rejected');
    expect(res.body.data).to.be.an('object');
  });

  it('should not approve trip request with invalid http request', async () => {
    const res = await router().patch('/api/request/1/approve')
      .set('token', token).send({ status: 'Approve' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(400);
    expect(res.body.error).to.be.a('string');
  });

  it('should not reject trip request with invalid http request', async () => {
    const res = await router().patch('/api/request/1/reject')
      .set('token', token).send({ status: 'Reject' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(400);
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.equals('allowed trip status is: Rejected');
  });

  it('should not approve trip request with no token', async () => {
    const res = await router().patch('/api/request/1/approve')
      .send({ status: 'Approved' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(401);
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.equals('Please provide a token first');
  });

  it('should not approve trip request if user is not a manager', async () => {
    const res = await router().patch('/api/request/1/approve')
      .set('token', otherTokens.validToken).send({ status: 'Approved' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(403);
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.equals('You are not allowed');
  });

  it('should not approve trip request if the token is invalid', async () => {
    const res = await router().patch('/api/request/1/approve')
      .set('token', 'hghdghsghsdghsdghs').send({ status: 'Approved' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(401);
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.equals('Auth failed');
  });

  it('should not approve trip request if the trip id is not authentic', async () => {
    const res = await router().patch('/api/request/5971/approve')
      .set('token', token).send({ status: 'Approved' });
    expect(res.body).to.be.an('object');
    expect(res.body.status).to.equals(400);
    expect(res.body.error).to.be.a('string');
    expect(res.body.error).to.equals('Please provide a authentic request');
  });
});
