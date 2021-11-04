import { v4 } from 'uuid';

export interface IdGeneratorInterface {
  uuid4(): string
}

export default class IdGenerator implements IdGeneratorInterface {
  public uuid4(): string {
    return v4();
  }
}