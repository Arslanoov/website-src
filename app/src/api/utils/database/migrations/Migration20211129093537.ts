import { Migration } from '@mikro-orm/migrations';

export class Migration20211129093537 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "content_item" drop column "content";');
  }
}
