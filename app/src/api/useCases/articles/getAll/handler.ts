import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';
import { Type } from '@/api/model/content/item/type';

import Command from './command';

const PER_PAGE = 1;

const handler = async (command: Command) => {
  const { em } = await initOrm();

  const qb = await em.createQueryBuilder(ContentItem, 'ci');

  qb
    .select('count(ci.id) as count')
    .where({
      lang: command.lang,
      type: Type.Article
    });

  const totalCount = await qb.execute();

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
    .join('ci.author', 'a')
    .limit(PER_PAGE)
    .offset((command.page - 1) * PER_PAGE)
    /*.orderBy({
      'ci.createdAt': 'DESC'
    })*/;

  const articles = await qb.execute();

  return {
    items: articles,
    perPage: PER_PAGE,
    totalCount: totalCount[0].count
  };
};

export default handler;