import CustomError from './CustomError';
import { HTTP_STATUS_UNAUTHORIZED, MSG_UNAUTHORIZED } from "../constants";

export default class UnauthorizedError extends CustomError {
  constructor() {
    super(MSG_UNAUTHORIZED, HTTP_STATUS_UNAUTHORIZED);
  }
}
