import { Migration } from '@mikro-orm/migrations';

export class Migration20211028092110 extends Migration {
  async up(): Promise<void> {
    this.addSql('create table "content_item" ("id" varchar(64) not null, "author_id" varchar(64) not null, "created_at" varchar(32) not null, "title" varchar(64) not null, "slug" varchar(64) not null, "description" varchar(255) not null, "content" text not null, "status" text check ("status" in (\'Draft\', \'Active\')) not null default \'Draft\', "type" text check ("type" in (\'Article\', \'Project\')) not null default \'Article\', "views" integer not null, "lang" text check ("lang" in (\'ru\', \'en\')) not null default \'en\', "cover" varchar(255) null);');
    this.addSql('alter table "content_item" add constraint "content_item_pkey" primary key ("id");');
    this.addSql('alter table "content_item" add constraint "content_item_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade;');
  }
}
