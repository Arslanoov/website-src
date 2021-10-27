import { Entity, Enum, Property } from '@mikro-orm/core';

import { IdType } from '@/api/infrastructure/model/user/idType';

import { Id } from './id';
import { Role } from './role';

// TODO: Add unit tests, add hasher
@Entity()
export class User {
  @Property({ type: IdType, length: 64, primary: true })
  private id!: Id

  @Property({ columnType: 'varchar(32)', type: 'text', unique: true })
  private username!: string

  @Property({ columnType: 'varchar(128)', type: 'text', })
  private password!: string

  @Enum({ columnType: 'varchar(16)', type: 'text', items: () => Role, default: Role.User })
  private role!: Role

  public constructor(id: Id, username: Username, password: string, role: Role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  public get identification(): Identification {
    return {
      id: this.id.value,
      username: this.username
    };
  }

  public static newAdmin(username: string, password: string) {
    return new User(Id.generate(), username, password, Role.Admin);
  }
}