import { Type, Platform, EntityProperty } from '@mikro-orm/core';

import CustomError from '@/api/errors/customError';

export class CreatedAtType extends Type<Date, string> {
  public convertToDatabaseValue(value: Date | string | undefined, platform: Platform, fromQuery?: boolean): string {
    if (value instanceof Date) {
      return value.toISOString().substr(0, 10);
    }

    if (!value || value.toString().match(/^\d{4}-\d{2}-\d{2}$/)) {
      return value as string;
    }

    throw new CustomError('Invalid date');
  }

  public convertToJSValue(value: string, platform: Platform): Date {
    return new Date(value);
  }

  public getColumnType(prop: EntityProperty, platform: Platform): string {
    return 'date';
  }
}
