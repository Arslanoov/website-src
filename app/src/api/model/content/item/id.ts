import { v4 as uuid } from 'uuid';

import Assert from '@/assert/assert';

export class Id {
  private readonly data: Identifier

  public constructor(value: Identifier) {
    Assert.uuid(value, 'Id');
    this.data = value;
  }

  public get value(): Identifier {
    return this.data;
  }
  
  public static generate() {
    return new Id(uuid());
  }
}