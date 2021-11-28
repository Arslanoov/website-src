import slugify from 'slugify';

import SlugError from '@/api/errors/slugError';

export interface SlugGeneratorInterface {
  generate(str: string): string
}

export default class SlugGenerator implements SlugGeneratorInterface {
  public generate(str: string): string {
    try {
      return slugify(str);
    } catch (e) {
      throw new SlugError();
    }
  }
}