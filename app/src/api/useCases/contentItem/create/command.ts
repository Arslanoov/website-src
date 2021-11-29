export default class Command {
  public constructor(
    public authorId: string,
    public title: string,
    public description: string,
    public rawContent: string,
    public type: string,
    public lang: string,
    public cover: string | null
  ) {
  }
}