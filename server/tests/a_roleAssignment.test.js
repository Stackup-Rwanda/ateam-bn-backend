import chai from 'chai';
import http from 'chai-http';
import index from '../index';

chai.use(http);
chai.should();

const superAdminDummy2Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkdW1teTJAZW1haWwucnciLCJyb2xlIjoiU3VwZXIgQWRtaW5pc3RyYXRvciIsImlhdCI6MTU4MDk1NzUwNH0.iOPzeyAUNCawgWmMfV9KCAbdAIpLdqHP8e9xVxZv6kA';
const notAdminValidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnV0aXJpZ2l0d2EgTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA';
const invalidToken = 'eyJhbGciOiJIUzi1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnV0aXJpZ2l0d2EgTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA';
const validRole = { role: 'Requester' };
const invalidRole = { role: 'Rqstr' };

describe('running user role update route tests', () => {
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
