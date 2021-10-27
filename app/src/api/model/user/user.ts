import { Entity, Enum, Property } from '@mikro-orm/core';

import { IdType } from '@/api/infrastructure/model/user/idType';

import { Id } from './id';
import { Role } from './role';

// TODO: Add unit tests, add hasher
@Entity()
export class User {
  @Property({ type: IdType, length: 64, primary: true })
  private id!: Id

  @Property({ type: 'text', length: 32, unique: true })
  private username!: string

  @Property({ type: 'text', length: 128 })
  private password!: string

  @Enum({ type: 'text', items: () => Role, default: Role.User })
  private role!: Role

  public constructor(id: Id, username: string, password: string, role: Role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  public static newAdmin(username: string, password: string) {
    return new User(Id.generate(), username, password, Role.Admin);
  }
}