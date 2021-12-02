import { Migration } from '@mikro-orm/migrations';

export class Migration20211201104719 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "content_item" alter column "raw_content" type text;');
  }
}
