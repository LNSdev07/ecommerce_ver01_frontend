export class DiscountRequestModel{
  private page!: number;
  private pageSize!: number;
  private textSearch!: string;
  private minDis!: number;
  private maxDis!: number;


  constructor(page: number, pageSize: number, textSearch: string, minDis: number, maxDis: number) {
    this.page = page;
    this.pageSize = pageSize;
    this.textSearch = textSearch;
    this.minDis = minDis;
    this.maxDis = maxDis;
  }
}
