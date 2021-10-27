import CustomError from '@/api/errors/customError';

export default class UserAlreadyExistsError extends CustomError {
  public constructor(message: string = 'User already exists.') {
    super(message);
  }
}
