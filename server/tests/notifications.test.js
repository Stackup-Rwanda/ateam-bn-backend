import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

let travelAdmniToken;
let normalToken;

const status = {
  viewed: 'read'
};
const status1 = {
  viewed: 'unread'
};
describe('Notifications Tests', () => {
  it('Travel administrator login request', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'dummy3@email.rw', password: '123456789' });
    travelAdmniToken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('Normal user login request', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'dummy7jaja@email.rw', password: '123456789' });
    normalToken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('When a user doesnt have a notification', async () => {
    const res = await chai
      .request(app)
      .get('/api/notifications')
      .set('token', normalToken);
    res.should.have.status(404);
    res.body.should.have.property('error');
  });
  it('When a user has notifications', async () => {
    const res = await chai
      .request(app)
      .get('/api/notifications')
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('Marking a notification that doesnt exist', async () => {
    const id = 10;
    const res = await chai
      .request(app)
      .post(`/api/notifications/${id}/mark`)
      .send(status)
      .set('token', travelAdmniToken);
    res.should.have.status(404);
    res.body.should.have.property('message');
  });
  it('Marking notification to read', async () => {
    const id = 2;
    const res = await chai
      .request(app)
      .post(`/api/notifications/${id}/mark`)
      .send(status)
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.have.property('message');
  });
  it('Marking notification to unread', async () => {
    const id = 2;
    const res = await chai
      .request(app)
      .post(`/api/notifications/${id}/mark`)
      .send(status1)
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.have.property('message');
  });
  it('When notifications dont exist', async () => {
    const id = 10;
    const res = await chai
      .request(app)
      .post(`/api/notifications/${id}/mark`)
      .send(status)
      .set('token', travelAdmniToken);
    res.should.have.status(404);
    res.body.should.have.property('message');
  });
  it('When passed the wrong id for notification', async () => {
    const res = await chai
      .request(app)
      .post(`/api/notifications/${1234}/mark`)
      .send(status)
      .set('token', travelAdmniToken);
    res.should.have.status(404);
    res.body.should.have.property('message');
  });
  it('When passed the wrong id for notification in words', async () => {
    const res = await chai
      .request(app)
      .post(`/api/notifications/fjsdfjasdhgf/mark`)
      .send(status)
      .set('token', travelAdmniToken);
    res.should.have.status(404);
    res.body.should.have.property('error');
  });
  it('Marking notifications as read', async () => {
    const res = await chai
      .request(app)
      .post('/api/notifications/mark')
      .send(status)
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.have.property('message');
  });
  it('Marking notifications as unread', async () => {
    const res = await chai
      .request(app)
      .post('/api/notifications/mark')
      .send(status1)
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.have.property('message');
  });
});
