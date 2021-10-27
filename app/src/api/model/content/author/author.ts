import { Entity, Property } from '@mikro-orm/core';

import { IdType } from '@/api/infrastructure/model/content/author/idType';

import { Id } from './id';

@Entity()
export class Author {
  @Property({ type: IdType, length: 64, primary: true })
  private id: Id
  @Property({ columnType: 'varchar(32)', type: 'text', unique: true })
  private username: string

  public constructor(id: Id, username: string) {
    this.id = id;
    this.username = username;
  }

  public static fromIdentification(identification: Identification): Author {
    return new Author(new Id(identification.id), identification.username);
  }
}