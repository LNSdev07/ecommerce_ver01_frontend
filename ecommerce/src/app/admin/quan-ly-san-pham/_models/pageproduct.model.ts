export class PageProductModel{
   textSearch!: string;
   page!: number;
   pageSize!: number;

   costRequestPage!: CostRequestPage;
   quantityRequestPage!: QuantityRequestPage;


  constructor(textSearch: string, page: number, pageSize: number,
              costRequestPage: CostRequestPage, quantityRequestPage: QuantityRequestPage) {
    this.textSearch = textSearch;
    this.page = page;
    this.pageSize = pageSize;
    this.costRequestPage = costRequestPage;
    this.quantityRequestPage = quantityRequestPage;
  }
}

export class CostRequestPage{
  private minCost!: number;

  private maxCost!: number;





  constructor(minCost: number, maxCost: number) {
    this.minCost = minCost;
    this.maxCost = maxCost;
  }

}

export class QuantityRequestPage{
  private minQuantity!: number;
  private maxQuantity!: number;


  constructor(minQuantity: number, maxQuantity: number) {
    this.minQuantity = minQuantity;
    this.maxQuantity = maxQuantity;
  }


}
