import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mochaAsync from '../helpers/mochaAsync';
import {
  oneWayTrip,
  incopreteWayTrip,
  incoDateWayTrip,
  incoloacationWayTrip,
  incoAccommodationWayTrip,
  twoWayTrip,
  twoWayTripMultipleCity,
  rememberTrip
} from './mochData/trips';
import usersTester from './mochData/users';

chai.use(chaiHttp);
chai.should();

const router = () => chai.request(app);

let tokenFalse;
let mytoken;
let tokenTrue;
const newTrip = {
  name: "Jay Lenno",
  passportId: "PC123487",
  tripType: "One-way",
  from: 1,
  to: [2, 1],
  date: "2050-09-13",
  returnDate: "2050-10-30",
  reasons: "hound issues",
  accommodationId: 2
};

const updatedTrip = {
  name: "Jay",
  passportId: "PC123777",
  tripType: "Return",
  from: 1,
  to: [2, 1],
  date: "2060-02-01",
  reasons: "different reason",
  returnDate: "2060-02-26",
  accommodationId: 2
};

const rememberPassportId = {
  passportId: "PC123777",
  tripType: "Return",
  from: 1,
  to: [2, 1],
  date: "2060-02-01",
  reasons: "different reason",
  returnDate: "2060-02-26",
  accommodationId: 2
};

const rememberReasons = {
  tripType: "Return",
  from: 1,
  to: [2, 1],
  date: "2060-02-01",
  reasons: "different reason",
  returnDate: "2060-02-26",
  accommodationId: 2
};

const returnTrip = {
  name: "Jay",
  passportId: "PC123777",
  tripType: "Return",
  from: 1,
  to: [2],
  date: "2020-02-28",
  reasons: "manager stuff only",
  returnDate: "2020-02-23",
  accommodationId: 2
};

describe('Test for create one way trip endpoint', () => {
  it(
    "should signin before making any request, to test it",
    mochaAsync(async () => {
      const res = await router()
        .post('/api/auth/signin')
        .send(usersTester[6]);
      mytoken = res.body.data.token;
    })
  );
  it('should create a new one way trip', mochaAsync(async () => {
    const res = await router()
      .post('/api/trips')
      .set('token', mytoken)
      .send(oneWayTrip);
    res.should.have.status(201);
    res.body.should.have.property('message', 'Trip was created successfully.');
  }));
  it('should create a return trip', mochaAsync(async () => {
    const res = await router()
      .post('/api/trips')
      .set('token', mytoken)
      .send(returnTrip);
    res.should.have.status(201);
    res.body.should.have.property('message', 'Trip was created successfully.');
  }));
  it(
    'should not create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips')
        .set('token', mytoken)
        .send(oneWayTrip);
      expect(res.body.status).to.equal(409);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip when data are incomplete',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips')
        .set('token', mytoken)
        .send(incopreteWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip if date is invalide',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips')
        .set('token', mytoken)
        .send(incoDateWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip if location is invalide',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips')
        .set('token', mytoken)
        .send(incoloacationWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should not create a new trip if accommodation is not from trip loacation',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips')
        .set('token', mytoken)
        .send(incoAccommodationWayTrip);
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips')
        .set('token', mytoken)
        .send(twoWayTrip);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
    })
  );
  it(
    'should create a new one way trip',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips')
        .set('token', mytoken)
        .send(twoWayTripMultipleCity);
      expect(res.body.status).to.equal(201);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.be.a('string');
    })
  );
});

describe('Test for Trip Stats endpoint', () => {
  it(
    'should get all trip stats',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips/stats')
        .set('token', mytoken);
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
    })
  );
  it(
    'should get error on trip stats when wrong fields are provided',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips/stats')
        .set('token', mytoken)
        .send({ myend: '2020-01-20', mystart: '2020-01-20' });
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should get error on trip stats when wrong date range',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips/stats')
        .set('token', mytoken)
        .send({ endDate: '2020-01-20', startDate: '2020-01-25' });
      expect(res.body.status).to.equal(422);
      expect(res.body).to.be.an('object');
      expect(res.body.error).to.be.a('string');
    })
  );
  it(
    'should get trip stats with 4 element in the data',
    mochaAsync(async () => {
      const res = await router()
        .post('/api/trips/stats')
        .set('token', mytoken)
        .send({ endDate: '2020-01-20', startDate: '2020-01-01' });
      expect(res.body.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data).to.contain.keys('lastDays', 'lastWeeks', 'lastWMonths', 'dateRange');
    })
  );
});

describe('remembered profile tests', () => {
  it('Travel administrator login request', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'JkayOne2@gmail.com', password: '123456789' });
    tokenFalse = res.body.data.token;
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
  it('user should be able to create a trip when rememberMe is false', async () => {
    const res = await chai
      .request(app)
      .post('/api/trips')
      .set('token', tokenFalse)
      .send(rememberTrip);
    res.should.have.status(201);
    res.body.should.be.an('object');
  });
});

describe('Test for create one way trip endpoint', () => {
  let tripId;
  let rememberTripId;
  let tripUpdateToken;
  let rememberToken;
  let unauthorizedToken;
  let managerToken;
  let superToken;

  it('user should first login', async () => {
    const result = await chai.request(app)
      .post('/api/auth/signin')
      .send({ email: 'kwizeradoddy@gmail.com', password: 'kalimba123' });
    superToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it('a signed in super admin should be able to update a particular user role ', async () => {
    const result = await chai
      .request(app)
      .patch('/api/users/MrDummy2/role')
      .send({ role: 'Requester' })
      .set('token', superToken);
    result.should.have.status(201);
    result.body.should.have.property('message', 'user role updated successfully');
  });

  it('user should first login', async () => {
    const result = await chai.request(app)
      .post('/api/auth/signin')
      .send({ email: 'JkayOne2@gmail.com', password: '123456789' });
    tripUpdateToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it('manager logs in to approve request', async () => {
    const result = await chai.request(app)
      .post('/api/auth/signin')
      .send({ email: 'nigorjeanluc@gmail.com', password: 'secret123' });
    managerToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it('unauthorized user should first login', async () => {
    const result = await chai.request(app)
      .post('/api/auth/signin')
      .send({ email: 'dummy3@email.rw', password: '123456789' });
    unauthorizedToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it('user with activated rememberMe should first login', async () => {
    const result = await chai.request(app)
      .post('/api/auth/signin')
      .send({ email: 'dummy2@email.rw', password: '123456789' });
    rememberToken = result.body.data.token;
    result.should.have.status(200);
    result.body.should.be.an('object');
  });

  it('user should be able to create a trip request', async () => {
    const result = await chai.request(app)
      .post('/api/trips')
      .send(newTrip)
      .set('token', tripUpdateToken);
    tripId = result.body.data.id;
    result.should.have.status(201);
  });

  it('user should be able to create a trip request', async () => {
    const result = await chai.request(app)
      .post('/api/trips')
      .send(newTrip)
      .set('token', rememberToken);
    rememberTripId = result.body.data.id;
    result.should.have.status(201);
  });

  it('users should be able to update their trip request', async () => {
    const result = await chai.request(app)
      .put(`/api/trips/${tripId}`)
      .send(updatedTrip)
      .set('token', tripUpdateToken);
    result.should.have.status(201);
    result.body.should.have.property('message', 'Trip was updated successfully.');
  });

  it('users should first opt out of rememberMe to update their trip request with new name/passportId/reasons', async () => {
    const result = await chai.request(app)
      .put(`/api/trips/${rememberTripId}`)
      .send(updatedTrip)
      .set('token', rememberToken);
    result.should.have.status(400);
    result.body.should.have.property('error', 'to update the name/passport Number/reasons, first opt out of remember me');
  });

  it('users should first opt out of rememberMe to update their trip request with new name/passportId/reasons', async () => {
    const result = await chai.request(app)
      .put(`/api/trips/${rememberTripId}`)
      .send(rememberPassportId)
      .set('token', rememberToken);
    result.should.have.status(400);
    result.body.should.have.property('error', 'to update the name/passport Number/reasons, first opt out of remember me');
  });

  it('users should first opt out of rememberMe to update their trip request with new name/passportId/reasons', async () => {
    const result = await chai.request(app)
      .put(`/api/trips/${rememberTripId}`)
      .send(rememberReasons)
      .set('token', rememberToken);
    result.should.have.status(400);
    result.body.should.have.property('error', 'to update the name/passport Number/reasons, first opt out of remember me');
  });

  it('should report a non existing trip request (trip with id not registered)', async () => {
    const result = await chai.request(app)
      .put(`/api/trips/123`)
      .send(updatedTrip)
      .set('token', tripUpdateToken);
    result.should.have.status(404);
    result.body.should.have.property('error', `trip not found`);
  });

  it('should report malformed trip id in path (invalid id)', async () => {
    const result = await chai.request(app)
      .put(`/api/trips/12xcx`)
      .send(updatedTrip)
      .set('token', tripUpdateToken);
    result.should.have.status(400);
    result.body.should.have.property('error', `malformed trip id 12xcx`);
  });

  it('users should not be able to update a not owned trip request', async () => {
    const result = await chai.request(app)
      .put(`/api/trips/${tripId}`)
      .send(updatedTrip)
      .set('token', unauthorizedToken);
    result.should.have.status(401);
    result.body.should.have.property('error', 'not authorized to access this trip request');
  });

  it('manager approves trip request', async () => {
    const result = await chai.request(app)
      .patch(`/api/request/${tripId}/approve`)
      .set('token', managerToken).send({ status: 'Approved' });
    result.should.have.status(200);
    result.body.should.have.property('message', 'This trip request was successfully approved');
  });

  it('users should not be able to update their trip request after they are approved or rejected', async () => {
    const result = await chai.request(app)
      .put(`/api/trips/${tripId}`)
      .send(updatedTrip)
      .set('token', tripUpdateToken);
    result.should.have.status(400);
    result.body.should.have.property('error', 'You can only edit Pending trip requests');
  });
  it('Users should be not be able to see the requests if not requester/manager', async () => {
    const id = 1;
    const result = await chai
      .request(app)
      .get(`/api/trips/${id}`)
      .set('token', tokenTrue);
    result.should.have.status(401);
    result.body.should.have.property('error');
  });
  it('a signed in super admin should be able to update a particular user role ', async () => {
    const result = await chai
      .request(app)
      .patch('/api/users/MrDummy2/role')
      .send({ role: 'Super Administrator' })
      .set('token', superToken);
    result.should.have.status(201);
    result.body.should.have.property('message', 'user role updated successfully');
  });
});

describe('viewing all trips test', () => {
  let viewToken;
  let managerToken;

  it('logging in a requester', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'dummy8jaja@email.rw', password: '123456789' });
    viewToken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });

  it('logging in a manager', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'nigorjeanluc@gmail.com', password: 'secret123' });
    managerToken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });

  it('a requester user should only view their own trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/trips')
      .send()
      .set('token', viewToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('a manager user should view all trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/trips')
      .send()
      .set('token', managerToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
});

describe('viewing all trips test', () => {
  let viewToken;
  let managerToken;

  it('logging in a requester', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'dummy8jaja@email.rw', password: '123456789' });
    viewToken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });

  it('logging in a manager', async () => {
    const res = await chai
      .request(app)
      .post('/api/auth/signin')
      .send({ email: 'nigorjeanluc@gmail.com', password: 'secret123' });
    managerToken = res.body.data.token;
    res.should.have.status(200);
    res.body.should.be.an('object');
  });

  it('a requester user should only view their own trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/trips')
      .send()
      .set('token', viewToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('a requester user should only view their own trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/trips/?page=1&limit=1')
      .send()
      .set('token', viewToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('a requester user should only view their own trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/trips/?page=2&limit=1')
      .send()
      .set('token', viewToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('a manager user should view all trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/trips')
      .send()
      .set('token', managerToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('a manager user should view all trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/trips/?page=1&limit=1')
      .send()
      .set('token', managerToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('a manager user should view all trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/trips/?page=2&limit=1')
      .send()
      .set('token', managerToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('a manager user should view all trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/places')
      .send()
      .set('token', managerToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('a manager user should view all trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/places/?page=1&limit=1')
      .send()
      .set('token', managerToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });

  it('a manager user should view all trip requests', async () => {
    const result = await chai.request(app)
      .get('/api/places/?page=2&limit=1')
      .send()
      .set('token', managerToken);
    result.should.have.status(200);
    result.body.should.have.property('data');
  });
});
