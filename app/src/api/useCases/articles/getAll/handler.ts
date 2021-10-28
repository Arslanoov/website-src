import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';

import Command from './command';

const PER_PAGE = 6;

const handler = async (command: Command) => {
  const { em } = await initOrm();

  // @ts-ignore
  const qb = await em.createQueryBuilder(ContentItem);
  qb
    .select([
      'id',
      'author',
      'created_at',
      'title',
      'slug',
      'description',
      'content',
      'cover'
    ])
    .where('lang', command.lang)
    .limit(PER_PAGE)
    .offset((command.page - 1) * PER_PAGE);

  const articles = await qb.getResult();

  console.log(articles);
  // TODO: Fix
  return articles.map((article: ContentItem) => ({
    ...article,
    id: article.identifier.value
  }));
};

export default handler;