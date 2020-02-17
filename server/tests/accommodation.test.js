import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../index';
import accommodationFiles from './mochData/accommodationFiles';

chai.use(chaiHttp);
chai.should();

let travelAdmniToken;

describe('Accommodation Tests', () => {
  it('Travel administrator login request', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'dummy3@email.rw', password: '123456789' });
    travelAdmniToken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });

  it('user should be able to add an accommodation with an image', async () => {
    const res = await chai
      .request(app)
      .post('/api/accommodation')
      .field('name', 'GOAT Hotel')
      .field('description', 'yaaaasss')
      .attach('image', fs.readFileSync(accommodationFiles.image1Path), accommodationFiles.image1)
      .field('locationId', 1)
      .field('geoLocation', '31.4893, 20.34304')
      .field('space', '5 rooms')
      .field('cost', '50.000 frw')
      .field('highlights', 'Burna Boy')
      .field('amenities', 'yaaaasss')
      .set('token', travelAdmniToken);
    res.should.have.status(201);
    res.body.should.have.property('message');
  });
  it('user should be able to add an accommodation with two images', async () => {
    const res = await chai
      .request(app)
      .post('/api/accommodation')
      .field('name', 'GOAT Hotel')
      .field('description', 'yaaaasss')
      .attach('image', fs.readFileSync(accommodationFiles.image1Path), accommodationFiles.image1)
      .attach('image', fs.readFileSync(accommodationFiles.image2Path), accommodationFiles.image2)
      .field('locationId', 1)
      .field('geoLocation', '31.4893, 20.34304')
      .field('space', '5 rooms')
      .field('cost', '50.000 frw')
      .field('highlights', 'Burna Boy')
      .field('amenities', 'yaaaasss')
      .set('token', travelAdmniToken);
    res.should.have.status(201);
    res.body.should.have.property('message');
  });
  it('user shouldnt be able to add an accommodation without an image', async () => {
    const res = await chai
      .request(app)
      .post('/api/accommodation')
      .field('name', 'GOAT Hotel')
      .field('description', 'yaaaasss')
      .attach('image', fs.readFileSync(accommodationFiles.video1Path), accommodationFiles.video1)
      .field('locationId', 1)
      .field('geoLocation', '31.4893, 20.34304')
      .field('space', '5 rooms')
      .field('cost', '50.000 frw')
      .field('highlights', 'Burna Boy')
      .field('amenities', 'yaaaasss')
      .set('token', travelAdmniToken);
    res.should.have.status(415);
    res.body.should.have.property('error');
  });
});
