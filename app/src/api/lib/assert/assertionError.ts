import CustomError from '@/api/errors/customError';

export default class AssertionError extends CustomError {
  public constructor(message: string) {
    super(message);
  }
}