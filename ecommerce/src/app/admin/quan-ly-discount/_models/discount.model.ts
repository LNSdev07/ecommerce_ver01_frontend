export class DiscountModel{
  private id!: number
  private discountName!: string
  private discountPercent!: number
  private createdDate!: number
  private updatedDate!: number


  constructor(id: number, discountName: string,
              discountPercent: number, createdDate: number,
              updatedDate: number) {
    this.id = id;
    this.discountName = discountName;
    this.discountPercent = discountPercent;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
