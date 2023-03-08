import passport from 'passport';
import { errors } from 'celebrate';
import session from 'express-session';
import express, { Express } from 'express';
import cors from 'cors';

import yandexAuthMiddleware from './middlewares/yandex.stategy';
import JwtStrategy from './middlewares/jwt.strategy';
import errorHandler from './middlewares/errorsHandler';

import { errorLogger, requestLogger } from './middlewares/logger';

import router from './routes';
import { yandexAuth } from './controllers/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(requestLogger);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user as Express.User));
passport.use(JwtStrategy);

// Unprotected
app.post('/api/token/', yandexAuthMiddleware, yandexAuth);
app.use(passport.authenticate('jwt', { session: true }));

// Protected

app.use(router);

app.use(errors());

app.use(errorLogger); // Логирование ошибок
app.use(errorHandler); // Возврат на клиента сообщения об ошибки

export default app;
