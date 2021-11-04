import { Language } from '@/api/model/content/item/lang';

export default class Command {
  public constructor(
    public lang: Language,
    public page: number = 1,
    public withDraft: boolean = true
  ) {
  }
}
