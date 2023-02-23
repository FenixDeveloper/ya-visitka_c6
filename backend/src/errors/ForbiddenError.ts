import CustomError from './CustomError';

export default class ForbiddenError extends CustomError {
  constructor() {
    const errorText = 'Несоответствие роли и операции';
    super(errorText, 403);
  }
}
