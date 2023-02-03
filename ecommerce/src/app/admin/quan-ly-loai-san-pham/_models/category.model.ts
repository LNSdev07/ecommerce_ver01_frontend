export class CategoryModel{
  id!: number
  categoryName = '';
  description= '';
  createdDate!: number;
  updatedDate!: number;

  constructor( id: number, categoryName: string, description: string, createdDate: number, updatedDate: number) {
    this.id = id;
    this.categoryName = categoryName;
    this.description = description;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}


