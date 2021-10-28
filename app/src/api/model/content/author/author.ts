import { Entity, Property } from '@mikro-orm/core';

import Assert from '@/assert/assert';

import { IdType } from '@/api/infrastructure/model/content/author/idType';

import { Id } from './id';

@Entity()
export class Author {
  @Property({ type: IdType, length: 64, primary: true })
  private id: Id
  @Property({ type: 'text', columnType: 'varchar(32)', unique: true })
  private username: Username

  public constructor(id: Id, username: Username) {
    this.id = id;
    Assert.lengthBetween(username, 'Username', 4, 32);
    this.username = username;
  }

  public static fromIdentification(identification: Identification): Author {
    return new Author(new Id(identification.id), identification.username);
  }
}