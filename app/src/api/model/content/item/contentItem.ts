import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';

import Assert from '@/assert/assert';

import { IdType } from '@/api/infrastructure/model/content/item/idType';
import { CreatedAtType } from '@/api/infrastructure/model/content/item/createdAtType';

import { Author } from '@/api/model/content/author/author';
import { Id } from './id';
import { CreatedAt } from './createdAt';
import { Status } from './status';
import { Type } from './type';
import { Language } from './lang';

@Entity()
export class ContentItem {
  @Property({ type: IdType, length: 64, primary: true })
  id!: Id
  @ManyToOne()
  author!: Author
  @Property({ type: CreatedAtType, length: 64 })
  createdAt!: CreatedAt
  @Property({ length: 64 })
  title!: string
  // TODO: Change length
  @Property({ length: 64 })
  slug!: string
  @Property({ length: 255 })
  description!: string
  @Property()
  content!: string
  @Enum({ type: 'string', length: 16, items: () => Status, default: Status.Draft })
  status!: Status
  @Enum({ type: 'string', length: 16, items: () => Type, default: Type.Article })
  type!: Type
  @Property()
  views!: number
  @Enum({ type: 'string', length: 16, items: () => Language, default: Language.en })
  lang!: Language
  @Property({ length: 255, nullable: true })
  cover!: string | null

  public constructor(
    id: Id,
    author: Author,
    createdAt: CreatedAt,
    title: string,
    slug: string,
    description: string,
    content: string,
    status: Status,
    type: Type,
    views: number,
    lang: Language,
    cover: string | null
  ) {
    this.id = id;
    this.author = author;
    this.createdAt = createdAt;
    Assert.lengthBetween(title, 'Title', 1, 64);
    this.title = title;
    Assert.lengthBetween(slug, 'Slug', 1, 64);
    this.slug = slug;
    Assert.lengthBetween(description, 'Description', 1, 255);
    this.description = description;
    Assert.minLength(content, 'Content', 1);
    this.content = content;
    Assert.includes(status, 'Status', Object.values(Status));
    this.status = status;
    Assert.includes(type, 'Type', Object.values(Type));
    this.type = type;
    Assert.moreThan(views, 'Views', 0);
    this.views = views;
    Assert.includes(lang, 'Language', Object.values(Language));
    this.lang = lang;
    this.cover = cover;
  }

  public static new(
    id: Id,
    author: Author,
    title: string,
    slug: string,
    description: string,
    content: string,
    type: Type,
    lang: Language,
    cover: string | null
  ): ContentItem {
    return new ContentItem(
      id,
      author,
      CreatedAt.now(),
      title,
      slug,
      description,
      content,
      Status.Draft,
      type,
      0,
      lang,
      cover
    );
  }

  public static newRuArticle(
    author: Author,
    title: string,
    slug: string,
    description: string,
    content: string,
    cover: string | null
  ): ContentItem {
    return ContentItem.new(
      Id.generate(),
      author,
      title,
      slug,
      description,
      content,
      Type.Article,
      Language.ru,
      cover
    );
  }

  public static newEnArticle(
    author: Author,
    title: string,
    slug: string,
    description: string,
    content: string,
    cover: string | null
  ): ContentItem {
    return ContentItem.new(
      Id.generate(),
      author,
      title,
      slug,
      description,
      content,
      Type.Article,
      Language.en,
      cover
    );
  }

  public static newRuProject(
    author: Author,
    title: string,
    slug: string,
    description: string,
    content: string,
    cover: string | null
  ): ContentItem {
    return ContentItem.new(
      Id.generate(),
      author,
      title,
      slug,
      description,
      content,
      Type.Project,
      Language.ru,
      cover
    );
  }

  public static newEnProject(
    author: Author,
    title: string,
    slug: string,
    description: string,
    content: string,
    cover: string | null
  ): ContentItem {
    return ContentItem.new(
      Id.generate(),
      author,
      title,
      slug,
      description,
      content,
      Type.Project,
      Language.en,
      cover
    );
  }

  public edit(
    title: string,
    slug: string,
    description: string,
    content: string,
    lang: Language,
    type: Type,
    cover: string | null
  ): void {
    Assert.lengthBetween(title, 'Title', 1, 64);
    this.title = title;
    Assert.lengthBetween(slug, 'Slug', 1, 64);
    this.slug = slug;
    Assert.lengthBetween(description, 'Description', 1, 255);
    this.description = description;
    Assert.minLength(content, 'Content', 1);
    this.content = content;
    Assert.includes(lang, 'Language', Object.values(Language));
    this.lang = lang;
    Assert.includes(type, 'Type', Object.values(Type));
    this.type = type;
    this.cover = cover;

    this.makeDraft();
  }

  public get identifier(): Id {
    return this.id;
  }

  public visit(): void {
    this.views += 1;
  }

  public activate(): void {
    this.status = Status.Active;
  }

  public makeDraft(): void {
    this.status = Status.Draft;
  }
}