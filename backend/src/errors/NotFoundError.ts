import CustomError from './CustomError';
import { HTTP_STATUS_NOT_FOUND } from "../constants";

export default class DataNotFoundError extends CustomError {
  constructor(errorText: string) {
    super(errorText, HTTP_STATUS_NOT_FOUND);
  }
}
