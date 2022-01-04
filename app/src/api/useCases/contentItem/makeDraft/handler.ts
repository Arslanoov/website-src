import { getEntityManager } from '@/api/utils/database/getEntityManager';

import { ContentItem } from '@/api/model/content/item/contentItem';
import { Id } from '@/api/model/content/item/id';

import ContentItemDoesntExist from '@/api/errors/contentItemDoesntExist';

import Command from './command';

const handler = async ({ id }: Command): Promise<void> => {
  const em = await getEntityManager();

  const contentItems = em.getRepository(ContentItem);
  const contentItem = await contentItems.findOne({
    id: new Id(id)
  }) as ContentItem | null;

  if (!contentItem) {
    throw new ContentItemDoesntExist();
  }

  contentItem.makeDraft();

  await em.flush();
};

export default handler;