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

const midllAuth = () => (req, res, next) => {
  req.session.passport = { user: testUser };
  next();
};

describe('Negative test profiles', () => {
  let authMock;
  let app;
  let server;

  const userID = '63fa18611d40f033474ea8411';

  testUser._id = userID;

  beforeAll(async () => {
    authMock = jest.spyOn(passport, 'authenticate');
    authMock.mockImplementation(midllAuth);

    app = require('../app').default;

    mongoose.set('strictQuery', true);
    await mongoose
      .connect(DEFAULT_DB_URL)
      .then(() => console.log(`Connected to database ${DEFAULT_DB_URL}`))
      .then(async () => {
        server = await app.listen(3002, () => {
          console.log(`App listening on port ${3002}!`);
        });
      })
      .catch((err) => console.error(err.message));
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
});
