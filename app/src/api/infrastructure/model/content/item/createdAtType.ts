import { Type, Platform, EntityProperty } from '@mikro-orm/core';

import { CreatedAt } from '@/api/model/content/item/createdAt';

export class CreatedAtType extends Type<CreatedAt, string> {
  public convertToDatabaseValue(value: CreatedAt, platform: Platform, fromQuery?: boolean): string {
    return String(value);
  }

  public convertToJSValue(value: string, platform: Platform): CreatedAt {
    return CreatedAt.fromString(value);
  }

  public getColumnType(prop: EntityProperty, platform: Platform): string {
    return `varchar(${prop.length})`;
  }
}
