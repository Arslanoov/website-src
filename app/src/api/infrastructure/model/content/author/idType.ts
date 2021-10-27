import { Type, Platform, EntityProperty } from '@mikro-orm/core';

import { Id } from '@/api/model/content/author/id';

export class IdType extends Type<Id, string> {
  public convertToDatabaseValue(value: Id, platform: Platform, fromQuery?: boolean): string {
    return value.value;
  }

  public convertToJSValue(value: string, platform: Platform): Id {
    return new Id(value);
  }

  public getColumnType(prop: EntityProperty, platform: Platform): string {
    return `varchar(${prop.length})`;
  }
}
