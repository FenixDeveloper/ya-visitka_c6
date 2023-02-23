import winston from 'winston';
import expressWinston from 'express-winston';

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/request.log',
      maxsize: 100000,
    }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      maxsize: 100000,
    }),
  ],

  format: winston.format.json(),
});
