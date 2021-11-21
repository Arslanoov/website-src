import initOrm from '@/api/utils/database/init';

import { ContentItem } from '@/api/model/content/item/contentItem';
import { Id as ContentItemId } from '@/api/model/content/item/id';
import { Id as AuthorId } from '@/api/model/content/author/id';
import { Type } from '@/api/model/content/item/type';
import { Language } from '@/api/model/content/item/lang';
import { Author } from '@/api/model/content/author/author';

import SlugGenerator from '@/api/services/slug-generator/slugGenerator';
import IdGenerator from '@/api/services/id/idGenerator';

import AuthorDoesntExist from '@/api/errors/authorDoesntExist';

import Command from './command';

const handler = async ({
  authorId,
  title,
  description,
  content,
  rawContent,
  type,
  lang,
  cover
}: Command): Promise<void> => {
  const { em } = await initOrm();

  const authors = em.getRepository(Author);
  const author = await authors.findOne({
    id: new AuthorId(authorId)
  });

  if (!author) {
    throw new AuthorDoesntExist();
  }

  const idGenerator = new IdGenerator();
  const slugGenerator = new SlugGenerator();

  const id = idGenerator.uuid4();

  const contentItem = ContentItem.new(
    new ContentItemId(id),
    author,
    title,
    `${id}-${slugGenerator.generate(title)}`,
    description,
    content,
    rawContent,
    type as Type,
    lang as Language,
    cover
  );

  em.persist(contentItem);
  em.flush();
};

export default handler;