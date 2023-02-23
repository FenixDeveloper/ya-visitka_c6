import CustomError from './CustomError';

export default class DataNotFoundError extends CustomError {
  constructor(errorText: string) {
    super(errorText, 404);
  }
}
