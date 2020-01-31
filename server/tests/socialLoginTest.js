import chai from 'chai';
// import http from 'chai-http';
import Browser from 'zombie';
import index from '../index';

const { assert } = chai;
// chai.use(http);
// chai.should();


describe('running social logins test', () => {
  //   it('user should be loged in via facebook', async () => {
  //   this.timeout(40000);
  beforeEach(() => {
    // Browser = new Browser({ site: 'http://localhost:3000' });
  });
  it("should login with facebook", (done) => {
    Browser.visit('http://127.0.0.1:3000/api/auth/facebook', (err, brw) => {
      if (err) {
        throw err;
      }

      brw.fill('email', 'aaa@gmail.com').fill('pass', 'password')
        .pressButton('login', (err, brw) => {
          brw.assert.success();
          done();
        });
    });

    //   afterEach(() => {
    //     index.close();
    //   });
  });
});
