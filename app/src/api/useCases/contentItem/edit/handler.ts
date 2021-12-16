import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';
import { Id } from '@/api/model/content/item/id';

import SlugGenerator from '@/api/services/slug-generator/slugGenerator';

import ContentItemDoesntExist from '@/api/errors/contentItemDoesntExist';

import Command from './command';

const handler = async ({
  id,
  authorId,
  title,
  description,
  rawContent,
  lang,
  type,
  cover
}: Command): Promise<void> => {
  const { em } = await initOrm();

  const contentItems = em.getRepository(ContentItem);
  const contentItem = await contentItems.findOne({
    id: new Id(id)
  }) as ContentItem | null;

  if (!contentItem || contentItem.author.id.value !== authorId) {
    throw new ContentItemDoesntExist();
  }

  const slugGenerator = new SlugGenerator();

  contentItem.edit(
    title,
    `${id}-${slugGenerator.generate(title)}`,
    description,
    rawContent,
    lang,
    type,
    cover
  );

  em.persist(contentItem);

  em.flush();
};

export default handler;