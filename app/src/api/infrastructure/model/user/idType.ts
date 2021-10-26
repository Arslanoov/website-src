import {Type, Platform} from '@mikro-orm/core';

import { Id } from '@/api/model/user/id';

export class IdType extends Type<Id, string> {
  public convertToDatabaseValue(value: Id, platform: Platform, fromQuery?: boolean): string {
    return value.value;
  }

  public convertToJSValue(value: string, platform: Platform): Id {
    return new Id(value);
  }
}
