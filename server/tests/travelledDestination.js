import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const router = () => chai.request(app);
describe('my Testing suite', () => {
  let validtoken;
  it('User should login before viewing a profile', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'JkayOne2@gmail.com', password: '123456789' });
    validtoken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });

  it('users should be able to view most travelled destination with application', (done) => {
    router()
      .get('/api/location/most-travelled-destination')
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
});
