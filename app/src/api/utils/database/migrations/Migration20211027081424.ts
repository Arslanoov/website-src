import { Migration } from '@mikro-orm/migrations';

export class Migration20211027081424 extends Migration {
  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(64) not null, "username" varchar(32) not null, "password" varchar(128) not null, "role" text check ("role" in (\'User\', \'Admin\')) not null default \'User\');');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }
}
