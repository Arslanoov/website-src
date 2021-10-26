import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';

import { Role } from './role';
import { Id } from '@/api/model/user/id';
import { IdType } from '@/api/infrastructure/model/user/idType';

@Entity()
export class User {
  @PrimaryKey()
  @Property({ type: IdType, length: 64})
  private id!: Id

  @Property()
  @Unique()
  private username!: string

  @Property()
  private password!: string

  @Enum({ items: () => Role, array: true, default: Role.User })
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