import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const router = () => chai.request(app);
describe('my Testing suite', () => {
  const validtoken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY2F0ZWdvcnkiOiJhZG1pbiIsImZpcnN0bmFtZSI6Im1pbmFuaSIsImxhc3RuYW1lIjoiam9zaHVhIiwidXNlcm5hbWUiOiJrZXktam9zaHVhIiwiZW1haWwiOiJrLmpvc2h1YTg1NUBnbWFpbC5jb20iLCJwaG9uZW51bWJlciI6IjA3ODk2MTk0NDIiLCJwYXNzd29yZCI6IiQyYSQxMiQzVDN3RG1QZU5CYVplOXVGZm0yM3plZ3VVT29Sd1d6cDVuMUU3LnJUWnNWcVp1aXBLN1NvbSIsImNyZWF0ZWRkYXRlIjoiMjAxOS0xMS0wNFQxNjowMjoyMi4zMTVaIiwibW9kaWZpZWRkYXRlIjoiIG5vbmUiLCJpYXQiOjE1ODAyNzg5MjgsImV4cCI6MTY2NjY3ODkyOH0.GBTZe8FjA7dvw3NWlPfXVQxBEHFlap6798A71C61fs0`;
  it('users should be able to logout from application', done => {
    router()
      .get('/api/v-unknown/users/logout')
      .set('Authorization', validtoken)
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

  it('users should be able to logout even if there is no token detected from application', done => {
    router()
      .get('/api/v-unknown/users/logout')
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
