import CustomError from './CustomError';
import { HTTP_STATUS_FORBIDDEN, MSG_FORBIDDEN } from '../constants';

export default class ForbiddenError extends CustomError {
  constructor() {
    super(MSG_FORBIDDEN, HTTP_STATUS_FORBIDDEN);
  }
}
