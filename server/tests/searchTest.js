import chai from 'chai';
import http from 'chai-http';
import index from '../index';

chai.use(http);
chai.should();
const realToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkdW1teTJAZW1haWwucnciLCJyb2xlIjoiU3VwZXIgQWRtaW5pc3RyYXRvciIsImlhdCI6MTU4MDk1NzUwNH0.iOPzeyAUNCawgWmMfV9KCAbdAIpLdqHP8e9xVxZv6kA';


describe('running search route', () => {
  it('user should search request based on status', async () => {
    const result = await chai
      .request(index)
      .get('/api/search/request')
      .send()
      .set('token', realToken)
      .field('status', 'pending');
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
});
