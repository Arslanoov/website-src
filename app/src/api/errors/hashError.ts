export class HashError extends Error {
  public constructor() {
    super('Unable to create hash.');
    this.name = 'HashError';
  }
}