import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../index';
import accommodationFiles from './mochData/accommodationFiles';

chai.use(chaiHttp);
chai.should();

let travelAdmniToken;
let tokenTrue;

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
  it('Travel administrator login request', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'dummy2@email.rw', password: '123456789' });
    tokenTrue = res.body.data.token;
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
      .field('highlights', 'Burna Boy')
      .field('amenities', 'yaaaasss')
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
      .field('highlights', 'Burna Boy')
      .field('amenities', 'yaaaasss')
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
      .field('highlights', 'Burna Boy')
      .field('amenities', 'yaaaasss')
      .field('amenities', 'yaaaasss')
      .set('token', travelAdmniToken);
    res.should.have.status(415);
    res.body.should.have.property('error');
  });
  it('user should be able to view all accommodations', async () => {
    const res = await chai
      .request(app)
      .get('/api/accommodation')
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('user should be able to view a single accommodation', async () => {
    const id = 1;
    const res = await chai
      .request(app)
      .get(`/api/accommodation/${id}`)
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('a message should be provided to the user if their feedback was not saved(wrong accommodationId).', async () => {
    const res = await chai
      .request(app)
      .post('/api/accommodation/feedback/l')
      .set('token', tokenTrue)
      .send('good room service');
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('When user doesnt have any single accommodation', async () => {
    const id = 10;
    const res = await chai
      .request(app)
      .get(`/api/accommodation/${id}`)
      .set('token', travelAdmniToken);
    res.should.have.status(404);
    res.body.should.have.property('error');
  });
  it('When user enters wrong id', async () => {
    const res = await chai
      .request(app)
      .get(`/api/accommodation/shdfhgsj`)
      .set('token', travelAdmniToken);
    res.should.have.status(400);
    res.body.should.have.property('error');
  });
  it('a message should be provided to the user if their feedback was not saved(wrong userId).', async () => {
    const res = await chai
      .request(app)
      .post('/api/accommodation/feedback/1')
      .set('token', tokenTrue)
      .send({ feedback: '%$one two three $%' });
    res.should.have.status(500);
    res.body.should.be.an('object');
  });
  it('User should be able to delete an accommodation', async () => {
    const id = 3;
    const res = await chai
      .request(app)
      .delete(`/api/accommodation/${id}/delete`)
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.have.property('message');
  });
  it('When user tries to delete an accommodation that doest exist', async () => {
    const id = 10;
    const res = await chai
      .request(app)
      .delete(`/api/accommodation/${id}/delete`)
      .set('token', travelAdmniToken);
    res.should.have.status(404);
    res.body.should.have.property('error');
  });
  it('User should be able to edit an accommodation', async () => {
    const id = 5;
    const res = await chai
      .request(app)
      .patch(`/api/accommodation/${id}/edit`)
      .field('name', 'The Realest Hotel')
      .field('description', 'yaaaasss')
      .attach('image', fs.readFileSync(accommodationFiles.image1Path), accommodationFiles.image1)
      .field('locationId', 1)
      .field('geoLocation', '31.4893, 20.34304')
      .field('highlights', 'Burna Boy')
      .field('amenities', 'yaaaasss')
      .field('amenities', 'yaaaasss')
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.have.property('message');
  });
  it('user should be able to edit an accommodation with two images', async () => {
    const id = 5;
    const res = await chai
      .request(app)
      .patch(`/api/accommodation/${id}/edit`)
      .field('name', 'GOAT Hotel')
      .field('description', 'yaaaasss')
      .attach('image', fs.readFileSync(accommodationFiles.image1Path), accommodationFiles.image1)
      .attach('image', fs.readFileSync(accommodationFiles.image2Path), accommodationFiles.image2)
      .field('locationId', 1)
      .field('geoLocation', '31.4893, 20.34304')
      .field('highlights', 'Burna Boy')
      .field('amenities', 'yaaaasss')
      .field('amenities', 'yaaaasss')
      .set('token', travelAdmniToken);
    res.should.have.status(200);
    res.body.should.have.property('message');
  });
  it('user shouldnt be able to edit an accommodation without an image', async () => {
    const id = 5;
    const res = await chai
      .request(app)
      .patch(`/api/accommodation/${id}/edit`)
      .field('name', 'GOAT Hotel')
      .field('description', 'yaaaasss')
      .attach('image', fs.readFileSync(accommodationFiles.video1Path), accommodationFiles.video1)
      .field('locationId', 1)
      .field('geoLocation', '31.4893, 20.34304')
      .field('highlights', 'Burna Boy')
      .field('amenities', 'yaaaasss')
      .field('amenities', 'yaaaasss')
      .set('token', travelAdmniToken);
    res.should.have.status(415);
    res.body.should.have.property('error');
  });
  it('When user tries to edit an accommodation that doest exist', async () => {
    const id = 10;
    const res = await chai
      .request(app)
      .patch(`/api/accommodation/${id}/edit`)
      .set('token', travelAdmniToken);
    res.should.have.status(404);
    res.body.should.have.property('error');
  });
  it('user should be able to like or fire an accommodation ', async () => {
    const res = await chai
      .request(app)
      .post('/api/accomodation/react/1')
      .set('token', tokenTrue)
      .send({ reactionType: 'fire' });
    res.should.have.status(200);
    res.body.should.be.an('object');
    res.body.should.have.property('message', 'reaction recorded successflly');
  });
  it('user should be able to change a reaction they made on an accommodation', async () => {
    const res = await chai
      .request(app)
      .post('/api/accomodation/react/1')
      .set('token', tokenTrue)
      .send({ reactionType: 'jjj' });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
  it('user should be able to give feedback on accommodation they have been to.', async () => {
    const res = await chai
      .request(app)
      .post('/api/accommodation/feedback/1')
      .set('token', tokenTrue)
      .send('good room service');
    res.should.have.status(201);
    res.body.should.be.an('object');
  });
});
