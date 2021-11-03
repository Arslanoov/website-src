import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';

import Command from './command';

const handler = async (command: Command) => {
  const { em } = await initOrm();

  const qb = await em.createQueryBuilder(ContentItem, 'ci');
  qb
    .select([
      'ci.id',
      'a.id as author_id',
      'a.username as author_username',
      'ci.created_at as created_at',
      'ci.title',
      'ci.slug',
      'ci.description',
      'ci.content',
      'ci.cover',
      'ci.views'
    ])
    .join('ci.author', 'a')
    .where({
      'slug': command.slug
    })
    .limit(1);

  const article = await qb.execute();

  return article?.[0];
};

export default handler;