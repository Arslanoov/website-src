import instance from './instance';

import { PaginatedContentItems } from '@/domain/content/contentItem';
import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/domain/content/contentItem';

export const getAllContentItems = async (page: number = 1, lang: Language = Language.en): Promise<PaginatedContentItems> => {
  const response = await instance.get('/admin/content/all', {
    params: {
      page,
      lang,
      type: Type.article
    }
  });

  return response.data;
};

export const createContentItem = async (
  title: string,
  description: string,
  rawContent: string,
  type: string,
  lang: string,
  cover: string
) => instance.post('/admin/content/create', {
  title,
  description,
  rawContent,
  type,
  lang,
  cover
});

export const editContentItem = async (
  id: string,
  title: string,
  description: string,
  rawContent: string,
  type: string,
  lang: string,
  cover: string
) => instance.patch('/admin/content/edit', { id, title, description, rawContent, type, lang, cover });

export const activateContentItem = async (id: string) => instance.patch('/admin/content/activate', { id });
export const makeContentItemDraft = async (id: string) => instance.patch('/admin/content/make-draft', { id });

export const removeContentItem = async (id: string) => instance.delete(`/content-items/remove/${id}`);
