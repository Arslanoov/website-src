export type ContentType = 'Post' | 'Project';
export type Status = 'Draft' | 'Active';

export type ContentItem = {
  id: string
  createdAt: string
  title: string
  slug: string
  img: string
  description: string
  content: string
  status: Status
  type: ContentType
  views: number
};