import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

export default class Command {
  public constructor(
    public id: string,
    public title: string,
    public description: string,
    public content: string,
    public lang: Language,
    public type: Type,
    public cover: string | null
  ) {
  }
}