import CustomError from './CustomError';

export default class UnauthorizedError extends CustomError {
  constructor() {
    const errorText = 'Пользователь не авторизован';
    super(errorText, 401);
  }
}
