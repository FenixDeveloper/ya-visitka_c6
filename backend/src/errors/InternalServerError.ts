import CustomError from './CustomError';

export default class InternalServerError extends CustomError {
  constructor(massage: string) {
    super(massage, 500);
  }
}
