import express from 'express';
import * as dotenv from 'dotenv';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorsHandler';

dotenv.config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

//РОУТЫ ТУТ
//
// ...

app.use(errorLogger); //Логирование ошибок
app.use(errorHandler); //Возврат на клиент сообщения об ошибки

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
