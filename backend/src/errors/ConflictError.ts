import CustomError from './CustomError';
import { HTTP_STATUS_CONFLICT } from '../constants';

export default class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, HTTP_STATUS_CONFLICT);
  }
}
