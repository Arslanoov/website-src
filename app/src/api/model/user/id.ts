import { v4 as uuid } from 'uuid';

import Assert from '@/assert/assert';

export class Id {
  private readonly data: Identifier

  public constructor(value: Identifier) {
    Assert.uuid(value, 'Id');
    this.data = value;
  }
  
  public static generate() {
    return new Id(uuid());
  }
  
  public get value() {
    return this.data;
  }
}