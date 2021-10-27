import { v4 as uuid } from 'uuid';

export class Id {
  private readonly data: string
  
  public constructor(value: string) {
    this.data = value;
  }
  
  public static generate() {
    return new Id(uuid());
  }
  
  public get value() {
    return this.data;
  }
}