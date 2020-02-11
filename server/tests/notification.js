import { expect } from 'chai';
import socketIo from "../helpers/socket";
import importQuery from '../helpers/authHelpers';
import importService from '../helpers/emailService';

describe('testing notification function', () => {
  const request = {
    tripId: 2,
    receiverId: 3,
    description: 'this is description',
    username: 'username',
    status: `REQUEST APPROVED`
  };

  it('this function should insert notification into database', async () => {
    const data = await importQuery.insertNotification(request);
    expect(data).to.be.a('object');
  });

  it('this function should send an email to right receipt', async () => {
    const data = await importService.emailing('Joshua', 'k.joshua855@gmail.com', 'Title', 'This is description');
    expect(data).to.be.a('object');
  });

  it('this function should display notification in real time with right receipt', async () => {
    const data = await socketIo.socket('3', 'notification', 'This is description');
    expect(data).to.be.a('object');
  });
});
