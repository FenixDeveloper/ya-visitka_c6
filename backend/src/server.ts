/* eslint-disable no-console */
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';

import { DEFAULT_DB_URL, DEFAULT_PORT } from './constants';

dotenv.config();

const { PORT = DEFAULT_PORT, DB_URL = DEFAULT_DB_URL } = process.env;

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
