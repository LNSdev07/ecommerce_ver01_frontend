export class PageSizeRequestModel{
  private textSearch!: string;
  private page!: number;
  private pageSize!: number;


  constructor(textSearch: string, page: number, pageSize: number) {
    this.textSearch = textSearch;
    this.page = page;
    this.pageSize = pageSize;
  }
}
