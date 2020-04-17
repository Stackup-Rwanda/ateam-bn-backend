import chai from 'chai';
import http from 'chai-http';
import index from '../index';

chai.use(http);
let currentToken;

describe('user sould see his travel stats', () => {
  it('User should login ', async () => {
    const result = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'nigorjeanluc@gmail.com', password: 'secret123' });
    currentToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });
  it('user should see stats', async () => {
    const result = await chai
      .request(index)
      .get('/api/stats')
      .set('token', currentToken);

    result.should.have.status(200);
    result.body.should.have.property('data');
  });
});
