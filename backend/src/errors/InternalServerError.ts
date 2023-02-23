import CustomError from './CustomError';
import { HTTP_STATUS_SERVER_ERROR } from '../constants';

export default class InternalServerError extends CustomError {
  constructor(massage: string) {
    super(massage, HTTP_STATUS_SERVER_ERROR);
  }
}
