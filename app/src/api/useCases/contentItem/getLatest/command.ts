import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

export default class Command {
  public constructor(
    public lang: Language,
    public type: Type,
    public withDraft: boolean = true
  ) {
  }
}
