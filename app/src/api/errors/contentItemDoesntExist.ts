import CustomError from './customError';

export default class ContentItemDoesntExist extends CustomError {
  public constructor() {
    super('Content type doesn\'t exists.');
  }
}