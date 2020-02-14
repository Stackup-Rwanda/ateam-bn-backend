import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../index';
import accommodationFiles from './mochData/accommodationFiles';

chai.use(chaiHttp);
chai.should();

const travelAdmniToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJNckR1bW15MyIsImVtYWlsIjoiZHVtbXkzQGVtYWlsLnJ3Iiwicm9sZSI6IlRyYXZlbCBBZG1pbmlzdHJhdG9yIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNTgxNTE4ODMxfQ.TXaSaJW7d5ckEHbVzA2OQlMwT8jbDqX01KE5x0rvVXc';

describe('Accommodation Tests', () => {
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
