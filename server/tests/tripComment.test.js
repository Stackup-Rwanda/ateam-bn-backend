import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import {
  idData,
  goodComment,
} from './mochData/tripCommentData';

chai.use(chaiHttp);
const router = () => chai.request(app);

let userToken;

describe('Test for Creating a trip comment, endpoint', () => {
  it(
    "2. should signin before making any request, to test it",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/auth/signin')
        .send({ email: 'dummy8jaja@email.rw', password: '123456789' });
      userToken = res.body.data.token;
    })
  );

  it(
    "5. should create a trip comment",
    mochaAsync(async () => {
      const res = await router()
        .post(`/api/trips/8/comment`)
        .send(goodComment)
        .set('token', userToken);
      const savedComment = res.body.data;
      idData.savedCommentId = savedComment.id;
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    })
  );
});

describe('Test for Updating a trip comment, endpoint', () => {
  it(
    "11. should update a trip comment",
    mochaAsync(async () => {
      const res = await router()
        .patch(`/api/comments/${idData.savedCommentId}/update`)
        .send(goodComment)
        .set('token', userToken);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    })
  );
});

describe('Test for Retrieving a trip comment, endpoint', () => {
  it(
    "15. should retrieve all trip comments",
    mochaAsync(async () => {
      const res = await router()
        .get(`/api/trips/8/comments`)
        .set('token', userToken);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('array');
    })
  );
});

describe('Test for Deleting a trip comment, endpoint', () => {
  it(
    "19. should delete a trip comment",
    mochaAsync(async () => {
      const res = await router()
        .delete(`/api/comments/${idData.savedCommentId}/delete`)
        .set('token', userToken);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
      expect(res.body.data).to.be.an('object');
    })
  );
});
