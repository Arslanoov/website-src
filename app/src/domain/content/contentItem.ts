export type ContentType = 'Post' | 'Project';
export type Status = 'Draft' | 'Active';

export type ContentItem = {
  id: string
  createdAt: string
  title: string
  slug: string
  description: string
  content: string
  type: ContentType
  cover?: string
};

export type PaginatedContentItems = {
  items: ContentItem[],
  totalCount?: number,
  perPage?: number
};