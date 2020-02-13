import { expect } from 'chai';
import socketIo from "../helpers/socket";
import importQuery from '../helpers/authHelpers';
import importService from '../helpers/emailService';

describe('testing notification function', () => {
  it('this function should insert notification into database', async () => {
    const data = await importQuery.insertNotification(1, 1, 'This is description');
    expect(data).to.be.a('object');
  });

  it('this function should send an email to right receipt', async () => {
    const data = await importService.emailing('Joshua', 'k.joshua855@gmail.com', 'Title', 'This is description');
    expect(data).to.be.a('object');
  });

  it('this function should display notification in real time with right receipt via Barefoot Nomad application', async () => {
    const data = await socketIo.socket('3', 'notification', 'This is description');
    expect(data).to.be.a('object');
  });
});
