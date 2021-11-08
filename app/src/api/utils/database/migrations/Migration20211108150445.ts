import { Migration } from '@mikro-orm/migrations';

export class Migration20211108150445 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "content_item" drop constraint if exists "content_item_created_at_check";');
    this.addSql('alter table "content_item" alter column "created_at" type varchar(64) using ("created_at"::varchar(64));');
  }
}
