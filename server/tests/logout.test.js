import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import token from './mochData/token';

chai.use(chaiHttp);
const router = () => chai.request(app);
describe('my Testing suite', () => {
  let validtoken;
  const Unexistuser = token.UnExistUser;
  it('login in manzi before signin out', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'butirigimanzi@gmail.com', password: '123456789' });
    validtoken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('users should be able to logout from application', (done) => {
    router()
      .post('/api/auth/logout')
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
      .post('/api/auth/logout')
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
      .post('/api/auth/logout')
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
