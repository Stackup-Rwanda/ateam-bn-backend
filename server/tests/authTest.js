import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import usersTester from './mochData/users';

chai.use(chaiHttp);
chai.should();
const router = () => chai.request(app);
chai.should();


describe('signUp validation tests', () => {
  it('user name should not be empty', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        name: '',
        email: 'kgiramata%7@gmail.com',
        password: '1234567',
        gender: 'female',
        birthdate: '1997-05-22',
        preferredLanguage: 'french',
        preferredCurrency: 'usd',
        location: 'kigali',
        role: 'admin',
        department: 'IT',
        lineManager: 'MM'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });

  it('user email should not be empty', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        name: 'mmmm',
        email: 'kgiramata%7@gmail',
        password: '1234567',
        gender: 'female',
        birthdate: '1997-05-22',
        preferredLanguage: 'french',
        preferredCurrency: 'usd',
        location: 'kigali',
        role: 'admin',
        department: 'IT',
        lineManager: 'MM'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
});

describe('signUp validation tests', () => {
  it('user name should not be empty', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        name: '',
        email: 'kgiramata%7@gmail.com',
        password: '1234567',
        gender: 'female',
        birthdate: '1997-05-22',
        preferredLanguage: 'french',
        preferredCurrency: 'usd',
        location: 'kigali',
        role: 'admin',
        department: 'IT',
        lineManager: 'MM'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });

  it('user email should be valid should not be empty', (done) => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send({
        name: 'mmmm',
        email: 'kgiramata%7@gmail',
        password: '1234567',
        gender: 'female',
        birthdate: '1997-05-22',
        preferredLanguage: 'french',
        preferredCurrency: 'usd',
        location: 'kigali',
        role: 'admin',
        department: 'IT',
        lineManager: 'MM'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.an('object');
        done();
      });
  });
});

describe('Test for signup endpoint', () => {
  it(
    'should create a new user account with appropriate request',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/auth/signup')
        .send(usersTester[0]);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    })
  );

  it(
    "shouldn't signup already saved user",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/auth/signup')
        .send(usersTester[1]);
      expect(res.body.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
});
