import CustomError from './customError';

export default class ContentItemDoesntExist extends CustomError {
  public constructor() {
    super('Content item doesn\'t exists.');
  }
}