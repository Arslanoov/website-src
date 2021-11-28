import CustomError from '@/api/errors/customError';

export class HashError extends CustomError {
  public constructor() {
    super('Unable to generate hash.');
  }
}