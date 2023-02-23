import CustomError from './CustomError';
import { HTTP_STATUS_BAD_REQUEST } from "../constants";

export default class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, HTTP_STATUS_BAD_REQUEST);
  }
}
