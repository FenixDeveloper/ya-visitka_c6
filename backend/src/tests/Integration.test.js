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

afterAll(async () => {
  await mongoose.connection.close();
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
    server.close();
  });

  test('Get profiles', async () => {
    const res = await request(app).get('/api/profiles').send({});

    expect(authMock).toBeCalled();
    expect(res.status).toBe(200);
  });

  test('Get profile by ID', async () => {
    const res = await request(app).get(`/api/profiles/${userID}`).send({});

    expect(authMock).toBeCalled();
    expect(res.status).toBe(200);
  });

  test('Get reactions', async () => {
    const res = await request(app)
      .get(`/api/profiles/${userID}/reactions`)
      .send({});

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
    server.close();
  });

  test('Get profile by wrong id', async () => {
    const res = await request(app).get(`/api/profiles/${userID}`).send({});

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

describe('Test uploads', () => {
  let authMock;
  let app;
  let server;

  const userID = '63fa18611d40f033474ea841';

  // Управление файлами
  const fs = require('fs');
  const path = require('path');
  const { DEFAULT_TEMP_DIR } = require('../constants');

  const tempDir = path.resolve(DEFAULT_TEMP_DIR);
  const filePath = path.resolve(tempDir, 'file');

  fs.writeFileSync(filePath, 'test');

  beforeAll(async () => {
    authMock = getMockedAuth(userID);
    app = require('../app').default;

    server = app.listen(3002, () => {
      console.log(`App listening on port ${3002}!`);
    });
  });

  afterAll(async () => {
    server.close();
    fs.rmSync(filePath);
  });

  test('Upload sime files', async () => {
    const res = await request(app)
      .post(`/api/files/`)
      .attach('hobby', filePath)
      .attach('status', filePath);

    const resultObj = JSON.parse(res.text);

    expect(authMock).toBeCalled();
    expect(res.status).toBe(200);
    expect(resultObj).toHaveProperty('hobby');
    expect(resultObj).toHaveProperty('status');
  });
});
