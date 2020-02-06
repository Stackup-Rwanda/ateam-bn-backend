import chai from 'chai';
import http from 'chai-http';
import index from '../index';

chai.use(http);
chai.should();

const manziToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnV0aXJpZ2l0d2EgTWFuemkiLCJ1c2VybmFtZSI6Im1hbnppIiwiZW1haWwiOiJtYW56aUBnbWFpbC5jb20iLCJpYXQiOjE1ODA4MjA1MTZ9.jPcc3YOJCGZaq-3Y-hQNQG_VlzijnocglCg5b0twHYA';
const jimmyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltbXkgS2F5a2F5IiwidXNlcm5hbWUiOiJrYXkiLCJlbWFpbCI6IkprYXlAZ21haWwuY29tIiwiaWF0IjoxNTgwODIwNjAwfQ.GugiqBFSyVbZqt7X4b19Abu6mXlJDTU3RyXTtepNNuY';
const wrongToken = 'eyJhbGciOijIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltbXkgS2F5a2F5IiwidXNlcm5hbWUiOiJrYXkiLCJlbWFpbCI6IkprYXlAZ21haWwuY29tIiwiaWF0IjoxNTgwODIwNzM3fQ.jCVUdtDEMpcyliUcuwxGixSn2dcqoJ6xLaXEFswHfFI';
const karenToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2lyYW1hdGEgS2FyZW4iLCJ1c2VybmFtZSI6ImtnaXIiLCJlbWFpbCI6IkthcmVuQGdtYWlsLmNvbSIsImlhdCI6MTU4MDgyMTI3OH0.AR-FqtlZ5-MnWqWZS-R-zjsiq6ingBz8b0RwvZ_GUSk';
const updatedJimmy = {
  name: "Jimmy Kaykay",
  birthdate: "12/22/2019",
  gender: "male",
  preferredLanguage: "English",
  preferredCurrency: "USD",
  location: "Kigali Rwanda"

};

const updatedInvalidJimmy = {
  name: "ay",
  birthdate: "22/12/2019",
  gender: "",
  preferredLanguage: "English",
  preferredCurrency: "USD",
  location: "Kigali Rwanda"

};


describe('running profile route tests', () => {
  it('user should be able to view details of his/her profile', async () => {
    const result = await chai
      .request(index)
      .get('/api/profile/manzi')
      .send()
      .set('token', manziToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
  it('user should be not be allowed to view a not owned profile', async () => {
    const result = await chai
      .request(index)
      .get('/api/profile/kay')
      .send()
      .set('token', manziToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });
  it('user should be not be allowed to view a profile with an incorrect token', async () => {
    const result = await chai
      .request(index)
      .get('/api/profile/kay')
      .send()
      .set('token', wrongToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });
  it('user should be not be allowed to view a profile when not registered', async () => {
    const result = await chai
      .request(index)
      .get('/api/profile/kay')
      .send()
      .set('token', karenToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });
  it('user should be able to update his/her profile', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile/kay')
      .send(updatedJimmy)
      .set('token', jimmyToken);
    result.should.have.status(201);
    result.body.should.have.property('message', 'user profile updated successfully');
  });
  it('user should not be able to update his/her profile with invalid fields', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile/kay')
      .send(updatedInvalidJimmy)
      .set('token', jimmyToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });
});
