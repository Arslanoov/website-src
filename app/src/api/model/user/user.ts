import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';

import { IdType } from '@/api/infrastructure/model/user/idType';

import { Role } from './role';
import { Id } from './id';

@Entity()
export class User {
  @Property({ type: IdType, length: 64, primary: true })
  private id!: Id

  @Property({ length: 32, unique: true})
  private username!: string

  @Property({ length: 128 })
  private password!: string

  @Enum({ items: () => Role, default: Role.User })
  private role!: Role
  
  public constructor(id: Id, username: string, password: string, role: Role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  public static signUp(username: string, password: string) {
    return new User(Id.generate(), username, password, Role.Admin);
  }
}