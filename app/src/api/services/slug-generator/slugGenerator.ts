import slugify from 'slugify';

export interface SlugGeneratorInterface {
  generate(str: string): string
}

export default class SlugGenerator implements SlugGeneratorInterface {
  public generate(str: string): string {
    // TODO: Add custom exception
    return slugify(str);
  }
}