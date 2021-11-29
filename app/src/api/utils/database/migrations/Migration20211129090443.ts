import { Migration } from '@mikro-orm/migrations';

export class Migration20211129090443 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "content_item" drop constraint if exists "content_item_created_at_check";');
    this.addSql('alter table "content_item" drop column if exists "created_at"');
    this.addSql('alter table "content_item" add column "created_at" date not null;');
  }
}
