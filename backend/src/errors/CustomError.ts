import IErrors from './index';

export default class CustomError extends Error implements IErrors {
  statusCode: number;

  message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
