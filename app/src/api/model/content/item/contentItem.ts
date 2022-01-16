import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';

import Assert from '@/assert/assert';

import { IdType } from '@/api/infrastructure/model/content/item/idType';
import { CreatedAtType } from '@/api/infrastructure/model/content/item/createdAtType';

import { Author } from '@/api/model/content/author/author';
import { Id } from './id';
import { Status } from './status';
import { Type } from './type';
import { Language } from './lang';

@Entity()
export class ContentItem {
  @Property({ type: IdType, length: 64, primary: true })
  id!: Id
  @ManyToOne()
  author!: Author
  @Property({ type: CreatedAtType })
  createdAt!: Date
  @Property({ length: 64 })
  title!: string
  @Property({ length: 128 })
  slug!: string
  @Property({ length: 255 })
  description!: string
  @Property()
  rawContent!: string
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
    createdAt: Date,
    title: string,
    slug: string,
    description: string,
    rawContent: string,
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
    Assert.lengthBetween(slug, 'Slug', 1, 128);
    this.slug = slug;
    Assert.lengthBetween(description, 'Description', 1, 255);
    this.description = description;
    Assert.minLength(rawContent, 'Raw content', 1);
    this.rawContent = rawContent;
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
    rawContent: string,
    type: Type,
    lang: Language,
    cover: string | null
  ): ContentItem {
    return new ContentItem(
      id,
      author,
      new Date(),
      title,
      slug,
      description,
      rawContent,
      Status.Draft,
      type,
      0,
      lang,
      cover
    );
  }

  public edit(
    title: string,
    slug: string,
    description: string,
    rawContent: string,
    lang: Language,
    type: Type,
    cover: string | null
  ): void {
    Assert.lengthBetween(title, 'Title', 1, 64);
    this.title = title;
    Assert.lengthBetween(slug, 'Slug', 1, 128);
    this.slug = slug;
    Assert.lengthBetween(description, 'Description', 1, 255);
    this.description = description;
    Assert.minLength(rawContent, 'Raw content', 1);
    this.rawContent = rawContent;
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