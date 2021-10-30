import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';

import Command from './command';

const handler = async (command: Command) => {
  const { em } = await initOrm();

  // @ts-ignore
  const qb = await em.createQueryBuilder(ContentItem);
  qb
    .select(
      'id',
      'author',
      'created_at',
      'title',
      'slug',
      'description',
      'content',
      'cover'
    )
    .where('id', command.articleId);

  const article = await qb.getResult();
  console.log(article);

  return article;
};

export default handler;