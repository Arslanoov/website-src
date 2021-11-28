import { Migration } from '@mikro-orm/migrations';

export class Migration20211128081810 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "content_item" alter column "slug" type varchar(128) using ("slug"::varchar(128));');
  }
}
