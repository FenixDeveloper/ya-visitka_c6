import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { errors } from 'celebrate';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorsHandler';
import { DEFAULT_DB_URL, DEFAULT_PORT } from './constants';
import { login } from './controllers/users';
import { isLoginRequestValid } from './validators/user';

dotenv.config();

const { PORT = DEFAULT_PORT, DB_URL = DEFAULT_DB_URL } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Unprotected
app.post('/api/login', isLoginRequestValid, login);

// РОУТЫ ТУТ
//
// ...

app.use(errors());

app.use(errorLogger); // Логирование ошибок
app.use(errorHandler); // Возврат на клиента сообщения об ошибки

mongoose.set('strictQuery', true);
mongoose.connect(DB_URL)
  .then(() => console.log(`Connected to database ${DB_URL}`))
  .catch((err) => console.error(err.message));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
