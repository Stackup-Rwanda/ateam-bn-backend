import chai from 'chai';
import http from 'chai-http';
import index from '../index';

const router = () => chai.request(index);
chai.use(http);
chai.should();
const { expect } = chai;
const realToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkdW1teTJAZW1haWwucnciLCJyb2xlIjoiU3VwZXIgQWRtaW5pc3RyYXRvciIsImlhdCI6MTU4MDk1NzUwNH0.iOPzeyAUNCawgWmMfV9KCAbdAIpLdqHP8e9xVxZv6kA';


describe('running search route', () => {
  it('user should search request based on status', (done) => {
    router()
      .get('/api/search/request')
      .set('token', realToken)
      .field('status', 'pending')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
  });
});
