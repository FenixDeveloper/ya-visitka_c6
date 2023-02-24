import express, { Express } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import session, { Session } from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { errors } from 'celebrate';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorsHandler';
import {
  DEFAULT_DB_URL, DEFAULT_PORT, ROLE_CURATOR, ROLE_STUDENT,
} from './constants';
import { login } from './controllers/users';
import { isLoginRequestValid } from './validators/user';
import { YandexStrategy } from './middlewares/strategies/yandex-strategy';
import User from './models/user';
import UnauthorizedError from './errors/UnauthorizedError';

dotenv.config();

interface ISession extends Session {
  passport?: any;
}

const {
  PORT = DEFAULT_PORT,
  DB_URL = DEFAULT_DB_URL,
  CURATORS = '',
  CLIENT_ID = '',
  CLIENT_SECRET = '',
} = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(session({
  secret: 'session_secret',
}));

passport.use(new YandexStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
}, (user, cb) => {
  cb(null, user);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user as Express.User));

// Unprotected
app.get('/api/oauth', passport.authenticate('yandex'));
app.get('/oauth/callback', passport.authenticate('yandex', {
  successRedirect: '/api/profile',
}));

app.get('/api/profile', (req, res, next) => {
  const data = (req.session as ISession).passport?.user;
  const curators = CURATORS ? CURATORS.split(',') : [];
  let result;
  if (curators.includes(data.user.default_email)) {
    result = {
      token: data.token,
      user: {
        _id: data.user.id,
        name: data.user.real_name,
        email: data.user.default_email,
        role: ROLE_CURATOR,
      },
    };
  } else {
    result = User.findUserByEmail(data.user.default_email)
      .then((user) => {
        if (!user) {
          throw new UnauthorizedError();
        }
        return {
          token: data.token,
          user: {
            _id: user._id,
            email: user.get('email'),
            role: ROLE_STUDENT,
          },
        };
      })
      .catch(next);
  }
  res.send(result);
});

app.post('/api/login', isLoginRequestValid, login);

// РОУТЫ ТУТ
//
// ...

app.use(errors());

app.use(errorLogger); // Логирование ошибок
app.use(errorHandler); // Возврат на клиента сообщения об ошибки

mongoose.set('strictQuery', true);
mongoose.connect(DB_URL)
  // eslint-disable-next-line no-console
  .then(() => console.log(`Connected to database ${DB_URL}`))
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err.message));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}!`);
});
