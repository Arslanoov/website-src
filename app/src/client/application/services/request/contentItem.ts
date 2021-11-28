import instance from './instance';

import { PaginatedContentItems } from '@/domain/content/contentItem';
import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/domain/content/contentItem';

// Articles

export const getAllArticles = async (page: number = 1, lang: Language = Language.en): Promise<PaginatedContentItems> => {
  const response = await instance.get('/content-items/all', {
    params: {
      page,
      lang,
      type: Type.article
    }
  });

  return response.data;
};

// Projects

export const getAllProjects = async (page: number = 1, lang: Language = Language.en): Promise<PaginatedContentItems> => {
  const response = await instance.get('/content-items/all', {
    params: {
      page,
      lang,
      type: Type.project
    }
  });

  return response.data;
};

// Content type

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
  content: string,
  rawContent: string,
  type: string,
  lang: string,
  cover: string
) => instance.post('/admin/content/create', {
  title,
  description,
  content,
  rawContent,
  type,
  lang,
  cover
});

export const editContentItem = async (
  id: string,
  title: string,
  description: string,
  content: string,
  rawContent: string,
  type: string,
  lang: string,
  cover: string
) => instance.patch('/admin/content/edit', { id, title, description, content, rawContent, type, lang, cover });

export const activateContentItem = async (id: string) => instance.patch('/admin/content/activate', { id });
export const makeContentItemDraft = async (id: string) => instance.patch('/admin/content/make-draft', { id });

export const removeContentItem = async (id: string) => instance.delete(`/content-items/remove/${id}`);
