import AssertionError from './assertionError';

export default class Assert {
  public static minLength(value: string, name: string, min: number): void {
    if (value.length < min) {
      throw new AssertionError(`${name} must contain more than ${min} characters`);
    }
  }

  public static maxLength(value: string, name: string, max: number): void {
    if (value.length > max) {
      throw new AssertionError(`${name} must contain less than ${max} characters`);
    }
  }

  public static lengthBetween(value: string, name: string, min: number, max: number): void {
    this.minLength(value, name, min);
    this.maxLength(value, name, max);
  }

  public static uuid(value: string, name: string): void {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
      throw new AssertionError(`${name} must be uuid.`);
    }
  }

  public static includes<T>(value: T, name: string, list: T[]): void {
    if (!list.includes(value)) {
      throw new AssertionError(`${name} must be one of the values: ${list.toString()}`);
    }
  }
}