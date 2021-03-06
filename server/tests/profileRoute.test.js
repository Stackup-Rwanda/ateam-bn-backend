import chai from 'chai';
import http from 'chai-http';
import index from '../index';

chai.use(http);
chai.should();

let jimmyToken;
const wrongToken = 'eyJhbGciOijIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmltbXkgS2F5a2F5IiwidXNlcm5hbWUiOiJrYXkiLCJlbWFpbCI6IkprYXlAZ21haWwuY29tIiwiaWF0IjoxNTgwODIwNzM3fQ.jCVUdtDEMpcyliUcuwxGixSn2dcqoJ6xLaXEFswHfFI';
const karenToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2lyYW1hdGEgS2FyZW4iLCJ1c2VybmFtZSI6ImtnaXIiLCJlbWFpbCI6IkthcmVuQGdtYWlsLmNvbSIsImlhdCI6MTU4MDgyMTI3OH0.AR-FqtlZ5-MnWqWZS-R-zjsiq6ingBz8b0RwvZ_GUSk';

let token1;
let token;
const updatedJimmy = {
  name: "Jimmy Manzi",
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
  location: "Kigali Rwanda",
  image: `${__dirname}/./mochData/profile.jpg`
};

describe('running profile route tests', () => {
  it('User should login before viewing a profile', async () => {
    const res = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'JkayOne2@gmail.com', password: '123456789' });
    jimmyToken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });

  it('user should be able to view details of his/her profile', async () => {
    const result = await chai
      .request(index)
      .get('/api/profile')
      .send()
      .set('token', jimmyToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('user should be not be allowed to view a profile with an incorrect token', async () => {
    const result = await chai
      .request(index)
      .get('/api/profile')
      .send()
      .set('token', wrongToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });

  it('user should be not be allowed to view a profile when not registered', async () => {
    const result = await chai
      .request(index)
      .get('/api/profile')
      .send()
      .set('token', karenToken);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });

  it('user should be able to update his/her profile', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile')
      .send(updatedJimmy)
      .set('token', jimmyToken);
    result.should.have.status(201);
    result.body.should.have.property('message', 'user profile updated successfully');
  });

  it('user should be able to update his/her profile with a profile photo and cover photo', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile')
      .field('name', updatedJimmy.name)
      .field('birthdate', updatedJimmy.birthdate)
      .field('gender', updatedJimmy.gender)
      .field('preferredLanguage', updatedJimmy.preferredLanguage)
      .field('preferredCurrency', updatedJimmy.preferredCurrency)
      .field('location', updatedJimmy.location)
      .attach('image', `${__dirname}/./mochData/profile.jpg`)
      .attach('cover', `${__dirname}/./mochData/cover.jpg`)
      .set('token', jimmyToken);
    result.should.have.status(201);
    result.body.should.have.property('message', 'user profile updated successfully');
  });

  it('user should be able to update his/her profile with a profile photo and cover photo', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile')
      .field('name', updatedJimmy.name)
      .field('birthdate', updatedJimmy.birthdate)
      .field('gender', updatedJimmy.gender)
      .field('preferredLanguage', updatedJimmy.preferredLanguage)
      .field('preferredCurrency', updatedJimmy.preferredCurrency)
      .field('location', updatedJimmy.location)
      .attach('cover', `${__dirname}/./mochData/cover.jpg`)
      .set('token', jimmyToken);
    result.should.have.status(201);
    result.body.should.have.property('message', 'user profile updated successfully');
  });

  it('user should be able to update his/her profile with a profile photo and cover photo', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile')
      .field('name', updatedJimmy.name)
      .field('birthdate', updatedJimmy.birthdate)
      .field('gender', updatedJimmy.gender)
      .field('preferredLanguage', updatedJimmy.preferredLanguage)
      .field('preferredCurrency', updatedJimmy.preferredCurrency)
      .field('location', updatedJimmy.location)
      .attach('image', `${__dirname}/./mochData/profile.jpg`)
      .set('token', jimmyToken);
    result.should.have.status(201);
    result.body.should.have.property('message', 'user profile updated successfully');
  });

  it('user should not be able to update his/her profile with an invalid profile photo and/or cover photo', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile')
      .field('name', updatedJimmy.name)
      .field('birthdate', updatedJimmy.birthdate)
      .field('gender', updatedJimmy.gender)
      .field('preferredLanguage', updatedJimmy.preferredLanguage)
      .field('preferredCurrency', updatedJimmy.preferredCurrency)
      .field('location', updatedJimmy.location)
      .attach('image', `${__dirname}/./mochData/invalidImage.jpg`)
      .attach('cover', `${__dirname}/./mochData/cover.jpg`)
      .set('token', jimmyToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });

  it('user should not be able to update his/her profile with an invalid profile photo and/or cover photo (wrong extension)', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile')
      .field('name', updatedJimmy.name)
      .field('birthdate', updatedJimmy.birthdate)
      .field('gender', updatedJimmy.gender)
      .field('preferredLanguage', updatedJimmy.preferredLanguage)
      .field('preferredCurrency', updatedJimmy.preferredCurrency)
      .field('location', updatedJimmy.location)
      .attach('image', `${__dirname}/./mochData/invalidImage.jpg`)
      .attach('cover', `${__dirname}/./mochData/invalidImage2.mp4`)
      .set('token', jimmyToken);
    result.should.have.status(415);
    result.body.should.have.property('error');
  });

  it('user should not be able to update his/her profile with more than one profile and/or cover photos', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile')
      .field('name', updatedJimmy.name)
      .field('birthdate', updatedJimmy.birthdate)
      .field('gender', updatedJimmy.gender)
      .field('preferredLanguage', updatedJimmy.preferredLanguage)
      .field('preferredCurrency', updatedJimmy.preferredCurrency)
      .field('location', updatedJimmy.location)
      .attach('image', `${__dirname}/./mochData/invalidImage.jpg`)
      .attach('image', `${__dirname}/./mochData/invalidImage.jpg`)
      .attach('cover', `${__dirname}/./mochData/cover.jpg`)
      .attach('cover', `${__dirname}/./mochData/cover.jpg`)
      .set('token', jimmyToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });

  it('user should not be able to update his/her profile with invalid fields', async () => {
    const result = await chai
      .request(index)
      .patch('/api/profile')
      .send(updatedInvalidJimmy)
      .set('token', jimmyToken);
    result.should.have.status(400);
    result.body.should.have.property('error');
  });
});

describe('remember profile test', () => {
  it('Travel administrator login request', async () => {
    const res = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'dummy3@email.rw', password: '123456789' });
    token1 = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('Travel administrator login request', async () => {
    const res = await chai
      .request(index)
      .post('/api/auth/signin')
      .send({ email: 'nigorjeanluc@gmail.com', password: 'secret123' });
    token = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
  it('user should be able to set if whether s/he wants his/her profile to be remembered on his next travel equest initiation', async () => {
    const result = await chai
      .request(index)
      .post('/api/profile/rememberMe/true')
      .send()
      .set('token', token1);
    result.should.have.status(200);
    result.body.should.have.property('message', 'your profile will be remembered on your next request initiation');
  });
  it('user should be able to set whether they do not want their profile  to be remembered on their next travel equest initiation',
    async () => {
      const result = await chai
        .request(index)
        .post('/api/profile/rememberMe/false')
        .send()
        .set('token', token);
      result.should.have.status(200);
      result.body.should.have.property('message', 'your profile will not be remembered on your next request initiation');
    });
});
