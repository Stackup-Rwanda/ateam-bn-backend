import chai from 'chai';
import http from 'chai-http';
import fs from 'fs';
import index from '../index';
import accommodationFiles from './mochData/accommodationFiles';

import mochaAsync from '../helpers/mochaAsync';

chai.use(http);
chai.should();

const router = () => chai.request(index);
let currentToken;
let managerToken;
const { expect } = chai;

describe('running create room route', () => {
  it('Manager should login before add a room', async () => {
    const result = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'nigorjeanluc@gmail.com', password: 'secret123' });
    managerToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it('manager should be able to add a room with an image', async () => {
    const res = await chai
      .request(index)
      .post('/api/room')
      .field('accommodationId', 1)
      .field('roomType', 'big room for family')
      .field('amenities', ['transport from airport', 'breakfast'])
      .field('cost', '200 000 rwf')
      .attach('image', fs.readFileSync(accommodationFiles.image1Path), accommodationFiles.image1)
      .field('status', 'available')
      .set('token', managerToken);
    res.should.have.status(200);
    res.body.should.have.property('data');
  });

  it('manager should not be able to add a room with wrong status', async () => {
    const res = await chai
      .request(index)
      .post('/api/room')
      .field('accommodationId', 1)
      .field('roomType', 'big room for family')
      .field('amenities', ['transport from airport', 'breakfast'])
      .field('cost', '200 000 rwf')
      .attach('image', fs.readFileSync(accommodationFiles.image1Path), accommodationFiles.image1)
      .field('status', 'boom')
      .set('token', managerToken);
    res.should.have.status(422);
    res.body.should.have.property('error');
  });

  it('manager should not be able to add a room with accommodation which does not exist', async () => {
    const res = await chai
      .request(index)
      .post('/api/room')
      .field('accommodationId', 25)
      .field('roomType', 'big room for family')
      .field('amenities', ['transport from airport', 'breakfast'])
      .field('cost', '200 000 rwf')
      .attach('image', fs.readFileSync(accommodationFiles.image1Path), accommodationFiles.image1)
      .field('status', 'available')
      .set('token', managerToken);
    res.should.have.status(500);
    res.body.should.have.property('error');
  });
  it('manager should not be able to add a room with no image', async () => {
    const res = await chai
      .request(index)
      .post('/api/room')
      .field('accommodationId', 25)
      .field('roomType', 'big room for family')
      .field('amenities', ['transport from airport', 'breakfast'])
      .field('cost', '200 000 rwf')
      .attach('image', fs.readFileSync(accommodationFiles.video1Path), accommodationFiles.video1)
      .field('status', 'available')
      .set('token', managerToken);
    res.should.have.status(415);
    res.body.should.have.property('error');
  });
});

describe('running booking room route', () => {
  it('User should login before booking a room', async () => {
    const result = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'JkayOne2@gmail.com', password: '123456789' });
    currentToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it(
    'user should book a room',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/room/book')
        .set('token', currentToken)
        .send({

          roomId: 1, from: "2020-03-03", to: "2020-05-10"
        });

      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
    })
  );


  it(
    'should not book a room if is already booked',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/room/book')
        .set('token', currentToken)
        .send({

          roomId: 1, from: "2020-03-02", to: "2020-05-10"
        });

      expect(res.body.status).to.equal(302);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not book a room which does not exist',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/room/book')
        .set('token', currentToken)
        .send({

          roomId: 20, from: "2020-03-02", to: "2020-05-10"
        });

      expect(res.body.status).to.equal(500);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not book a room if the arrival date is in the past',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/room/book')
        .set('token', currentToken)
        .send({

          roomId: 1, from: "2020-01-02", to: "2020-05-10"
        });

      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not book a room if he types wrong',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/room/book')
        .set('token', currentToken)
        .send({

          roomId: 'hjgg', from: "2020-01-02", to: "2020-05-10"
        });

      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
});

describe('running retrieve rooms route', () => {
  it('User should login before booking a room', async () => {
    const result = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'JkayOne2@gmail.com', password: '123456789' });
    currentToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });
  it(
    'user should retrieve all rooms',
    mochaAsync(async () => {
      const res = await router()
        .get('/api/room')
        .set('token', currentToken);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
    })
  );
});
