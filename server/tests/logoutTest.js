import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const router = () => chai.request(app);
describe('my Testing suite', () => {
  const validtoken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnV0aXJpZ2l0d2EgTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA`;
  const UnExistUser = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltbXkgS2F5a2F5IiwidXNlcm5hbWUiOiJrYXkiLCJlbWFpbCI6IkprYXlAZ21haWwuY29tIiwiaWF0IjoxNTgwODIwNjAwfQ.GugiqBFSyVbZqt7X4b19Abu6mXlJDTU3RyXTtepNNuY`;
  it('users should be able to logout from application', (done) => {
    router()
      .get('/api/users/logout')
      .set('token', validtoken)
      .end((error, response) => {
        expect(response).to.have.status([200]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('users should not click twice on button of logout from application', (done) => {
    router()
      .get('/api/users/logout')
      .set('token', validtoken)
      .end((error, response) => {
        expect(response).to.have.status([401]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(401);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.a('string');
        done(error);
      });
  });

  it('users should not click twice on button of logout from application', (done) => {
    router()
      .get('/api/users/logout')
      .set('token', UnExistUser)
      .end((error, response) => {
        expect(response).to.have.status([401]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(401);
        expect(response.body).to.have.property('error');
        expect(response.body.error).to.be.a('string');
        done(error);
      });
  });
});
