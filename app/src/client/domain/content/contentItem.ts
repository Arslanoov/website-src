export enum Type {
  article = 'Article',
  project = 'Project'
}

export type ContentType = Type.article | Type.project;

export enum Language {
  russian = 'ru',
  english = 'en',
}

export type LanguageType = Language.english | Language.russian;

export enum Status {
  draft = 'Draft',
  active = 'Active',
}

export type StatusType = Status.draft | Status.active;

export type ContentItem = {
  id: string
  createdAt: string
  title: string
  slug: string
  description: string
  content: string
  rawContent?: string
  type: ContentType
  lang?: Language
  cover?: string
  status?: Status
  views?: number
};

export type PaginatedContentItems = {
  items: ContentItem[],
  totalCount?: number,
  perPage?: number
};