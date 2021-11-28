import CustomError from '@/api/errors/customError';

export default class SlugError extends CustomError {
  public constructor() {
    super('Unable to generate slug');
  }
}