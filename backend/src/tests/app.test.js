const { default: mongoose } = require('mongoose');
const passport = require('passport');
const request = require('supertest');

const authMock = jest.spyOn(passport, 'authorize');

const app = require('../app').default;

describe('Test Auth', () => {
  test('should be 200', async () => {
    const res = await request(app).get('/hello').send({});
    expect(res.status).toBe(200);
  });

  test('Auth should be called', async () => {
    await request(app).get('/helloProtected').send({});

    expect(authMock).toBeCalled();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});

// const student = {
//   _id: user.id,
//   name,
//   email,
//   cohort,
//   photo,
//   role: ROLE_STUDENT,
// };
