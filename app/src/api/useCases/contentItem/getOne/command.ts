export default class Command {
  public constructor(
    public slug: string,
    public forManage: boolean = false
  ) {
  }
}
