export class SizeModel{
    private id!: number;
    private sizeCode!: string;
    private sizeName!: string;
    private createdDate!: number
    private updatedDate!: number


  constructor(id: number, sizeCode: string,
              sizeName: string, createdDate: number,
              updatedDate: number) {
    this.id = id;
    this.sizeCode = sizeCode;
    this.sizeName = sizeName;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
