import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';
import { Type } from '@/api/model/content/item/type';

import Command from './command';

const LATEST_COUNT = 2;

const handler = async (command: Command) => {
  const { em } = await initOrm();

  const qb = await em.createQueryBuilder(ContentItem, 'ci');

  qb
    .select([
      'ci.id',
      'a.id as authorId',
      'a.username as authorUsername',
      'ci.created_at as createdAt',
      'ci.title',
      'ci.slug',
      'ci.description',
      'ci.content',
      'ci.cover',
      'ci.views'
    ])
    .where({
      lang: command.lang,
      type: Type.Article
    })
    .join('ci.author', 'a')
    .limit(LATEST_COUNT)
    /*.orderBy({
      'ci.createdAt': 'DESC'
    })*/;

  const articles = await qb.execute();

  return {
    items: articles
  };
};

export default handler;