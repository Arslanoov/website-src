import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';
import { Status } from '@/api/model/content/item/status';

import ContentItemDoesntExist from '@/api/errors/contentItemDoesntExist';

import Command from './command';

const handler = async ({ slug, forManage }: Command) => {
  const { em } = await initOrm();

  const contentItems = em.getRepository(ContentItem);
  const contentItem = await contentItems.findOne({ slug }) as ContentItem | null;

  if (!contentItem) {
    throw new ContentItemDoesntExist();
  }

  if (!forManage) {
    contentItem.visit();
  }

  em.flush();

  const qb = await em.createQueryBuilder(ContentItem, 'ci');
  
  const toSelect = [
    'ci.id',
    'a.username as author_username',
    'ci.created_at as created_at',
    'ci.title',
    'ci.slug',
    'ci.description',
    'ci.content',
    'ci.cover'
  ];

  if (forManage) {
    toSelect.push(
      'a.id as author_id',
      'ci.status',
      'ci.views',
      'ci.type',
      'ci.lang',
      'ci.raw_content'
    );
  }
  
  qb
    .select(toSelect)
    .join('ci.author', 'a')
    .where({ slug });
  
  if (!forManage) {
    qb.andWhere({
      status: Status.Active
    }).cache();
  }

  qb.limit(1);

  const articles = await qb.execute();

  return articles[0];
};

export default handler;