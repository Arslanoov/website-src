export default class CredentialsError extends Error {
  public constructor() {
    super('Invalid credentials.');
    this.name = 'CredentialsError';
  }
}