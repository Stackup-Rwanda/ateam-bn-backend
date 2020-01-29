import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import usersTester from './mochData/users';

chai.use(chaiHttp);
const router = () => chai.request(app);

describe('Test for signup endpoint', () => {
  it("should create a new user account with appropriate request",
    mochaAsync(async () => {
      const res = await router()
        .post("/api/auth/signup")
        .send(usersTester[0]);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    }));

  it("shouldn't signup already saved user",
    mochaAsync(async () => {
      const res = await router()
        .post("/api/auth/signup")
        .send(usersTester[1]);
      expect(res.body.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    }));
});
