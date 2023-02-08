export class ColorModel{
  private id!: number;
  private colorCode!: string;
  private colorName!: string;
  private createdDate!: number;
  private updatedDate!: number;


  constructor(id: number, colorCode: string, colorName: string, createdDate: number, updatedDate: number) {
    this.id = id;
    this.colorCode = colorCode;
    this.colorName = colorName;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
