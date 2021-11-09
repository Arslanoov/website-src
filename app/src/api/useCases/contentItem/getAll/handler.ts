import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';
import { Status } from '@/api/model/content/item/status';

import Command from './command';

const PER_PAGE = 6;

const handler = async (command: Command) => {
  const { em } = await initOrm();

  const qb = await em.createQueryBuilder(ContentItem, 'ci');

  qb
    .select('count(ci.id) as count')
    .where({
      lang: command.lang,
      type: command.type
    });

  if (!command.withDraft) {
    qb.andWhere({
      'status': Status.Active
    });
  }

  const totalCount = await qb.execute();

  qb
    .select([
      'ci.id',
      'a.id as author_id',
      'a.username as author_username',
      'ci.created_at as createdAt',
      'ci.title',
      'ci.slug',
      'ci.description',
      'ci.cover'
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
    totalCount: Number(totalCount[0].count)
  };
};

export default handler;