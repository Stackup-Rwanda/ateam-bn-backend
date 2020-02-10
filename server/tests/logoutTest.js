import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import token from './mochData/token';

chai.use(chaiHttp);
const router = () => chai.request(app);
describe('my Testing suite', () => {
  const validtoken = token.validToken;
  const Unexistuser = token.UnExistUser;
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

  it('users should not logout when does not exist in database', (done) => {
    router()
      .get('/api/users/logout')
      .set('token', Unexistuser)
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
