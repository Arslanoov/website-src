import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';
import { Id } from '@/api/model/content/item/id';

import ContentItemDoesntExist from '@/api/errors/contentItemDoesntExist';

import Command from './command';

const handler = async ({ id }: Command): Promise<void> => {
  const { em } = await initOrm();

  const contentItems = em.getRepository(ContentItem);
  const contentItem = await contentItems.findOne({
    id: new Id(id)
  }) as ContentItem | null;

  if (!contentItem) {
    throw new ContentItemDoesntExist();
  }

  em.remove(contentItem);
  em.flush();
};

export default handler;