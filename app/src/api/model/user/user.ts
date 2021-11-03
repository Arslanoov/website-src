import { Entity, Enum, Property } from '@mikro-orm/core';

import Assert from '@/assert/assert';

import { IdType } from '@/api/infrastructure/model/user/idType';

import { Id } from './id';
import { Role } from './role';

@Entity()
export class User {
  @Property({ type: IdType, length: 64, primary: true })
  id!: Id

  @Property({ length: 32, unique: true })
  username!: string

  @Property({ length: 128 })
  password!: string

  @Enum({ type: 'string', length: 16, items: () => Role, default: Role.User })
  role!: Role

  public constructor(id: Id, username: Username, password: string, role: Role) {
    this.id = id;
    Assert.lengthBetween(username, 'Username', 4, 32);
    this.username = username;
    Assert.lengthBetween(username, 'Password', 4, 128);
    this.password = password;
    Assert.includes(role, 'Role', Object.values(Role));
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