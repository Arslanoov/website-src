import { Type, Platform, EntityProperty } from '@mikro-orm/core';

import { CreatedAt } from '@/api/model/content/item/createdAt';

export class CreatedAtType extends Type<CreatedAt, string> {
  public convertToDatabaseValue(value: CreatedAt, platform: Platform, fromQuery?: boolean): string {
    return value.value.toString();
  }

  public convertToJSValue(value: string, platform: Platform): CreatedAt {
    return new CreatedAt(new Date(value));
  }

  public getColumnType(prop: EntityProperty, platform: Platform): string {
    return `varchar(${prop.length})`;
  }
}
