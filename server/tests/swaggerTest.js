import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const router = () => chai.request(app);
describe('my Testing suite', () => {
  it('users should be redirected to api documentation when he/she used wrong link', (done) => {
    router()
      .get('/jssdfbfuicnsdkcsdkjfdisfbn')
      .end((error, response) => {
        expect(response).to.have.status([400]);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('status');
        expect(response.body.status).to.be.equal(400);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });
});
