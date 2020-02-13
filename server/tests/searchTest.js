import chai from 'chai';
import http from 'chai-http';
import index from '../index';

const router = () => chai.request(index);
chai.use(http);
const { expect } = chai;
const realToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkdW1teTJAZW1haWwucnciLCJyb2xlIjoiU3VwZXIgQWRtaW5pc3RyYXRvciIsImlhdCI6MTU4MDk1NzUwNH0.iOPzeyAUNCawgWmMfV9KCAbdAIpLdqHP8e9xVxZv6kA';


describe('running search route', async () => {
  it('user should search request based on status', (done) => {
    router()
      .get('/api/search/request')
      .set('token', realToken)
      .field('id', '1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(500);
        done();
      });
  });
  it('user should search request based on id', (done) => {
    router()
      .get('/api/search/request')
      .set('token', realToken)
      .send({ search: 1 })
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.property('data');
        done();
      });
  });
  it('user should not get unavailable data', (done) => {
    router()
      .get('/api/search/request')
      .set('token', realToken)
      .send({ search: 19 })
      .end((err, res) => {
        console.log(res.body);
        expect(res.status).to.equal(404);
        expect(res.body).to.be.property('message');

        done();
      });
  });
});
