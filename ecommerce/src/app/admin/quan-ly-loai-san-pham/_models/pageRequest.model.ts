export class pageRequestModel{
  public page!: number
  public pageSize!: number
  public textSearch!: string;



  constructor(page: number, pageSize: number, textSearch: string) {
    this.page = page;
    this.pageSize = pageSize;
    this.textSearch = textSearch;
  }
}
