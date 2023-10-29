import { Migration } from '@mikro-orm/migrations';
import { argon2id, hash } from 'argon2';

export class Migration20231023122906 extends Migration {

  async up(): Promise<void> {
    const password = await hash(process.env.ADMIN_PASSWORD || 'password', {
      type: argon2id
    });

    this.addSql('insert into "user" (id, username, password, role) VALUES (\'0c54d2f9-023c-4a74-9921-d83c869c828e\', \'Admin\', \'' + password + '\', \'Admin\');');
    this.addSql('insert into "author" (id, username) VALUES (\'0c54d2f9-023c-4a74-9921-d83c869c828e\', \'Admin\');');
  }

}
