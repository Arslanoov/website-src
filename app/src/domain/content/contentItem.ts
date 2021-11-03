export type ContentType = 'Post' | 'Project';
export type Status = 'Draft' | 'Active';

export type ContentItem = {
  id: string
  created_at: string
  title: string
  slug: string
  description: string
  content: string
  status: Status
  type: ContentType
  cover?: string
};

export type PaginatedContentItems = {
  items: ContentItem[],
  totalCount?: number,
  perPage?: number
};