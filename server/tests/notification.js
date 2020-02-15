import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import socketIo from "../helpers/socket";
import importQuery from '../helpers/authHelpers';
import { eventNotification } from '../helpers/email';

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('my Notification Testing suite', () => {
  it('users should be able to see real-time notification', (done) => {
    router()
      .get('/api/user/notification')
      .end((error, response) => {
        expect(response);
        done(error);
      });
  });
});

describe('testing notification function', () => {
  it('this function should insert notification into database', async () => {
    const data = await importQuery.insertNotification(1, 1, 'This is description');
    expect(data).to.be.a('object');
  });

  it('this function should send an email to right receipt', async () => {
    await eventNotification('k.joshua855@gmail.com', 'Joshua', 'https://ateam-bn-backend-staging.herokuapp.com/api/trips/10/', 'This is notification');
  });

  it('this function should display notification in real time with right receipt via Barefoot Nomad application', async () => {
    const data = await socketIo.socket('3', 'notification', 'This is description');
    expect(data).to.be.a('object');
  });
});
