import chai from 'chai';
import http from 'chai-http';
import index from '../index';

chai.use(http);
chai.should();

let superAdminDummy2Token;
let notAdminValidToken;
const invalidToken = 'eyJhbGciOiJIUzi1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnV0aXJpZ2l0d2EgTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA';
const validRole = { role: 'Requester' };
const invalidRole = { role: 'Rqstr' };

describe('running user role update route tests', () => {
  it('Super administrator login request', async () => {
    const result = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'dummy2@email.rw', password: '123456789' });
    superAdminDummy2Token = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it('non super administrator user login', async () => {
    const result = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'butirigimanzi@gmail.com', password: '123456789' });
    notAdminValidToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it('a signed in super admin should be able to update a particular user role ', async () => {
    const result = await chai
      .request(index)
      .patch('/api/users/MrDummy/role')
      .send(validRole)
      .set('token', superAdminDummy2Token);
    result.should.have.status(201);
    result.body.should.have.property('message', 'user role updated successfully');
  });

  it('a signed in super admin should not be able to update a particular user role with invalid input', async () => {
    const result = await chai
      .request(index)
      .patch('/api/users/MrDummy/role')
      .send(invalidRole)
      .set('token', superAdminDummy2Token);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });

  it('should not update the role of a non registered user', async () => {
    const result = await chai
      .request(index)
      .patch('/api/users/nonExistingUser/role')
      .send(validRole)
      .set('token', superAdminDummy2Token);
    result.should.have.status(404);
    result.body.should.have.property('error');
  });

  it('should be able to update user role with invalid credentials(token)', async () => {
    const result = await chai
      .request(index)
      .patch('/api/users/MrDummy/role')
      .send(validRole)
      .set('token', invalidToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });

  it('super admin should be the only person able to update a particular user role ', async () => {
    const result = await chai
      .request(index)
      .patch('/api/users/MrDummy/role')
      .send(validRole)
      .set('token', notAdminValidToken);
    result.should.have.status(401);
    result.body.should.have.property('error', `Sorry! you don't have the permission`);
  });
});
