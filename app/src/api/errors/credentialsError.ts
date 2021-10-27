import CustomError from '@/api/errors/customError';

export default class CredentialsError extends CustomError {
  public constructor() {
    super('Invalid credentials.');
  }
}