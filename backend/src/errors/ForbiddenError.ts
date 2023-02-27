import CustomError from './CustomError';
import { HTTP_STATUS_FORBIDDEN, MSG_FORBIDDEN } from '../constants';

export default class ForbiddenError extends CustomError {
  constructor(message: string = MSG_FORBIDDEN) {
    super(message, HTTP_STATUS_FORBIDDEN);
  }
}
