import Chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";

Chai.should();
Chai.use(chaiHttp);

describe('Endpoint /', () => {
  it("should welcome a users and redirect them to the documentation", done => {
    Chai.request(app).get("/anywrongurls").end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property("message", "Hey !! You are Welcome to BareFoot Nomad, Use the link below its documentation of application");
      done();
    });
  });
});
