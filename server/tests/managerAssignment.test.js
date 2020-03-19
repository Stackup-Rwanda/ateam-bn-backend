import chai from 'chai';
import http from 'chai-http';
import index from '../index';

chai.use(http);
chai.should();

let superAdminToken;

const validAssignment = {
  requesters: [8, 9, 10, 11],
  manager: 3
};
const invalidAssignment = {
  requesters: [8, 9, 4, 11],
  manager: 8
};
const invalidAssignmentManager = {
  requesters: [8, 9, "10adsfasdf", 11],
  manager: 3
};
const invalidAssignmentRequester = {
  requesters: [3, 9, 10, 11],
  manager: 3
};

describe('running user role update route tests', () => {
  it('Super administrator login request', async () => {
    const result = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'kwizeradoddy@gmail.com', password: 'kalimba123' });
    superAdminToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });
  it('a super administrator should be able to assign a requesters to a manager', async () => {
    const result = await chai
      .request(index)
      .put('/api/users/managers/assign')
      .send(validAssignment)
      .set('token', superAdminToken);
    result.should.have.status(201);
    result.body.should.have.property('message', 'operation terminated successfully');
  });
  it('a super administrator should be able to view all managers', async () => {
    const result = await chai
      .request(index)
      .get('/api/users/managers')
      .send()
      .set('token', superAdminToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
  it('a super administrator should be able to view all users', async () => {
    const result = await chai
      .request(index)
      .get('/api/users')
      .send()
      .set('token', superAdminToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
  it('a super administrator should be able to view all users', async () => {
    const result = await chai
      .request(index)
      .get('/api/users/?page=1&limit=1')
      .send()
      .set('token', superAdminToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
  it('a super administrator should be able to view all users', async () => {
    const result = await chai
      .request(index)
      .get('/api/users/?page=2&limit=1')
      .send()
      .set('token', superAdminToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
  it('a super administrator should not be able to assign a requesters to a manager when managersId is not valid', async () => {
    const result = await chai
      .request(index)
      .put('/api/users/managers/assign')
      .send(invalidAssignment)
      .set('token', superAdminToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });
  it('a super administrator should not be able to assign a requesters to a manager if requesterIds are not valid', async () => {
    const result = await chai
      .request(index)
      .put('/api/users/managers/assign')
      .send(invalidAssignmentManager)
      .set('token', superAdminToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });
  it('a super administrator should be able to assign a requesters to a manager only when all requester Ids are valid', async () => {
    const result = await chai
      .request(index)
      .put('/api/users/managers/assign')
      .send(invalidAssignmentRequester)
      .set('token', superAdminToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });
});
