/* eslint-disable global-require */
const { ROLE_STUDENT } = require('constants');
const { default: mongoose } = require('mongoose');

const passport = require('passport');

const request = require('supertest');
const { DEFAULT_DB_URL } = require('../constants');

const testUser = {
  _id: '',
  name: 'Вася пупкин',
  email: 'test@test.ru',
  cohort: 'TEST',
  role: ROLE_STUDENT,
};

const getMockedAuth = (userId) => {
  const authMock = jest.spyOn(passport, 'authenticate');
  authMock.mockImplementation(() => (req, res, next) => {
    req.session.passport = { user: { ...testUser, _id: userId } };
    next();
  });

  return authMock;
};

beforeAll(async () => {
  mongoose.set('strictQuery', true);
  await mongoose
    .connect(DEFAULT_DB_URL)
    .then(() => console.log(`Connected to database ${DEFAULT_DB_URL}`))
    .catch((err) => console.error(err.message));
});

describe('positive test profiles', () => {
  let authMock;
  let app;
  let server;

  const userID = '63fa18611d40f033474ea841';

  beforeAll(async () => {
    authMock = getMockedAuth(userID);
    app = require('../app').default;

    server = app.listen(3002, () => {
      console.log(`App listening on port ${3002}!`);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test('Get profiles', async () => {
    const res = await request(app).get('/api/profile').send({});

    expect(authMock).toBeCalled();
    expect(res.status).toBe(200);
  });

  test('Get profile by ID', async () => {
    const res = await request(app).get(`/api/profile/${userID}`).send({});

    expect(authMock).toBeCalled();
    expect(res.status).toBe(200);
  });

  test('Get reactions', async () => {
    const res = await request(app).get(`/api/profile/${userID}/reactions`).send({});

    expect(authMock).toBeCalled();
    expect(res.status).toBe(200);
  });
});

describe('Negative test profiles', () => {
  let authMock;
  let app;
  let server;

  const userID = '63fa18611d40f033474ea8411';

  beforeAll(async () => {
    authMock = getMockedAuth(userID);

    app = require('../app').default;

    server = app.listen(3002, () => {
      console.log(`App listening on port ${3002}!`);
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test('Get profile by wrong id', async () => {
    const res = await request(app).get(`/api/profile/${userID}`).send({});

    expect(authMock).toBeCalled();
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Bad Request');
  });

  test('Get unhandled routs', async () => {
    const res = await request(app).get('/unhandeled').send({});

    expect(authMock).toBeCalled();
    expect(res.status).toBe(404);
  });
});
