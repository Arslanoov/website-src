import { Migration } from '@mikro-orm/migrations';

export class Migration20211121113343 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "content_item" add column "raw_content" varchar(255) not null;');
  }
}
