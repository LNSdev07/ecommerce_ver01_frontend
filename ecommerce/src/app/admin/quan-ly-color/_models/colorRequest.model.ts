export class ColorRequestModel{
  private page!: number;
  private pageSize!: number;
  private textSearch!: string;


  constructor(page: number, pageSize: number, textSearch: string) {
    this.page = page;
    this.pageSize = pageSize;
    this.textSearch = textSearch;
  }
}
