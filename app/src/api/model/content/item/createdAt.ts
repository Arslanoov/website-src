import Assert from '@/assert/assert';

export class CreatedAt {
  private readonly date: Date;

  public constructor(date: Date, nowDate: Date = new Date()) {
    Assert.earlierThan(date, nowDate, 'Created at', 'now');
    this.date = date;
  }

  public static now(): CreatedAt {
    return new CreatedAt(new Date());
  }

  public static fromString(string: string): CreatedAt {
    return new CreatedAt(new Date(string));
  }

  public toString(): string {
    const date = CreatedAt.formatDateValue(this.date.getDate());
    const month = CreatedAt.formatDateValue(this.date.getMonth() + 1);
    const hours = CreatedAt.formatDateValue(this.date.getHours());
    const minutes = CreatedAt.formatDateValue(this.date.getMinutes());
    return `${month}.${date}.${this.date.getFullYear()} ${hours}:${minutes}:00`;
  }

  public get value(): Date {
    return this.date;
  }

  public static formatDateValue(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}