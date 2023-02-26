/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import * as dotenv from 'dotenv';
import { errors } from 'celebrate';

import { login } from './controllers/users';
import errorHandler from './middlewares/errorsHandler';
import { errorLogger, requestLogger } from './middlewares/logger';
import { isLoginRequestValid } from './validators/user';
import {
  DEFAULT_DB_URL, DEFAULT_PORT,
} from './constants';
import yandexAuthMiddleware from './middlewares/yandex.stategy';
import JwtStrategy from './middlewares/jwt.strategy';
import { jwtAuth, redirect, yandexAuth } from './controllers/auth';

import profileRouter from './routes/profile';

dotenv.config();

const {
  PORT = DEFAULT_PORT,
  DB_URL = DEFAULT_DB_URL,
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/api/profile', profileRouter);

passport.use(JwtStrategy);

// Unprotected
app.get('/oauth', redirect);
app.get('/oauth/callback', yandexAuthMiddleware, yandexAuth);

// app.post('/api/login', isLoginRequestValid, login);

// Protected
app.use(passport.authenticate('jwt', { session: false }));
app.get('/login', jwtAuth);

app.use(errors());

app.use(errorLogger); // Логирование ошибок
app.use(errorHandler); // Возврат на клиента сообщения об ошибки

mongoose.set('strictQuery', true);
mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to database ${DB_URL}`))
  .catch((err) => console.error(err.message));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
