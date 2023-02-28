import express, { Express } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import * as dotenv from 'dotenv';
import { errors } from 'celebrate';
import session from 'express-session';

import yandexAuthMiddleware from './middlewares/yandex.stategy';
import JwtStrategy from './middlewares/jwt.strategy';
import errorHandler from './middlewares/errorsHandler';
import { errorLogger, requestLogger } from './middlewares/logger';

import router from './routes';
import { yandexAuth } from './controllers/auth';

import { DEFAULT_DB_URL, DEFAULT_PORT } from './constants';

dotenv.config();

const { PORT = DEFAULT_PORT, DB_URL = DEFAULT_DB_URL } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(requestLogger);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user as Express.User));
passport.use(JwtStrategy);

app.get('/hello', (req, res) => {
  res.send('Hello');
});

// Unprotected
app.post('/api/token/', yandexAuthMiddleware, yandexAuth);
app.use(passport.authenticate('jwt', { session: true }));

// Protected

app.get('/helloProtected', (req, res) => {
  res.send('helloProtected');
});
app.use(router);

app.use(errors());

app.use(errorLogger); // Логирование ошибок
app.use(errorHandler); // Возврат на клиента сообщения об ошибки

mongoose.set('strictQuery', true);
mongoose
  .connect(DB_URL)
  .then(() => console.log(`Connected to database ${DB_URL}`))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch((err) => console.error(err.message));

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });

export default app;
