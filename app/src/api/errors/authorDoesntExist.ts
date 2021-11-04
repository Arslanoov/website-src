import CustomError from './customError';

export default class AuthorDoesntExist extends CustomError {
  public constructor() {
    super('Author doesn\'t exists.');
  }
}