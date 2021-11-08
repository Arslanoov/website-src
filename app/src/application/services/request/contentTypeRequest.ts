import instance from './instance';

import { PaginatedContentItems } from '@/domain/content/contentItem';
import { Language } from '@/api/model/content/item/lang';

export const getAllArticles = async (page: number = 1, lang: Language = Language.en): Promise<PaginatedContentItems> => {
  const response = await instance.get('/articles/all', {
    params: {
      page,
      lang
    }
  });

  return response.data;
};

export const getLatestArticles = async (page: number = 1, lang: Language = Language.en): Promise<PaginatedContentItems> => {
  const response = await instance.get('/articles/latest', {
    params: {
      page,
      lang
    }
  });

  return response.data;
};

export const getArticle = async (slug: string): Promise<PaginatedContentItems> => {
  const response = await instance.get(`/api/articles/one/${slug}`);
  return response.data;
};
