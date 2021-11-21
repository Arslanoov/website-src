// TODO: Unify types
export type ContentType = 'Post' | 'Project';
export type Status = 'Draft' | 'Active';
export type Language = 'en' | 'ru';

export type ContentItem = {
  id: string
  createdAt: string
  title: string
  slug: string
  description: string
  content: string
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