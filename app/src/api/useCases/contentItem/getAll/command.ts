import { Language } from '@/api/model/content/item/lang';
import { Type } from '@/api/model/content/item/type';

export default class Command {
  public constructor(
    public page: number = 1,
    public lang: Language | null = null,
    public type: Type | null = null,
    public forManage: boolean = true
  ) {
  }
}
