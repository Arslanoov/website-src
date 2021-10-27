import { Migration } from '@mikro-orm/migrations';

export class Migration20211027184413 extends Migration {
  async up(): Promise<void> {
    this.addSql('create table "author" ("id" varchar(64) not null, "username" varchar(32) not null);');
    this.addSql('alter table "author" add constraint "author_pkey" primary key ("id");');
    this.addSql('alter table "author" add constraint "author_username_unique" unique ("username");');
  }
}
