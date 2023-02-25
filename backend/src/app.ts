import express, { Express } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import * as dotenv from 'dotenv';
import { errors } from 'celebrate';
import session from 'express-session';

import errorHandler from './middlewares/errorsHandler';
import { errorLogger, requestLogger } from './middlewares/logger';
import { DEFAULT_DB_URL, DEFAULT_PORT } from './constants';
import yandexAuthMiddleware from './middlewares/yandex.stategy';
import JwtStrategy from './middlewares/jwt.strategy';
import { jwtAuth, yandexAuth } from './controllers/auth';

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

// Unprotected
app.post('/api/token/', yandexAuthMiddleware, yandexAuth);

// Protected
app.use(passport.authenticate('jwt', { session: true }));
app.get('/api/login', jwtAuth);

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
