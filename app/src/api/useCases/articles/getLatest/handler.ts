import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';
import { Type } from '@/api/model/content/item/type';
import { Status } from '@/api/model/content/item/status';

import Command from './command';

const LATEST_COUNT = 2;

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
    .where({
      lang: command.lang,
      type: Type.Article
    })
    .join('ci.author', 'a')
    .limit(LATEST_COUNT)
    /*.orderBy({
      'ci.createdAt': 'DESC'
    })*/;

  if (!command.withDraft) {
    qb.andWhere({
      'status': Status.Active
    });
  }

  const articles = await qb.execute();

  return {
    items: articles
  };
};

export default handler;