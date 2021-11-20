import instance from './instance';

import { PaginatedContentItems } from '@/domain/content/contentItem';
import { Language } from '@/api/model/content/item/lang';

// Articles

export const getAllArticles = async (page: number = 1, lang: Language = Language.en): Promise<PaginatedContentItems> => {
  const response = await instance.get('/content-items/all', {
    params: {
      page,
      lang,
      // TODO: Add enum
      type: 'Article'
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
      // TODO: Add enum
      type: 'Project'
    }
  });

  return response.data;
};

// Content type

export const getAllContentItems = async (page: number = 1, lang: Language = Language.en): Promise<PaginatedContentItems> => {
  const response = await instance.get('/content-items/all', {
    params: {
      page,
      lang,
      // TODO: Add enum
      type: 'Article'
    }
  });

  return response.data;
};


export const createContentType = async (
  authorId: string,
  title: string,
  description: string,
  content: string,
  type: string,
  lang: string,
  cover: string
) => instance.post('/admin/content/create', { authorId, title, description, content, type, lang, cover });


export const removeContentType = async (id: string) => instance.delete(`/content-items/remove/${id}`);
