import {Component, OnInit} from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {FormBuilder, Validators} from "@angular/forms";
import {CategoryService} from "../_services/category.service";
import {CategoryModel} from "../_models/category.model";
@Component({
  selector: 'app-modal-categoty',
  templateUrl: './modal-categoty.component.html',
  styleUrls: ['./modal-categoty.component.scss']
})
export class ModalCategotyComponent implements OnInit{
  id!: number
  constructor(public modalRef: MdbModalRef<ModalCategotyComponent>,
              private fb: FormBuilder,
              private categoryService: CategoryService) {}

  dataCategory!: CategoryModel

  nameCategory ='';
  descriptionCategory ='';

  ngOnInit(): void {
    let resp;
    if (this.id != 0 && this.id) {
      this.categoryService.getCategoryById(this.id).subscribe(resp => {
         this.dataCategory = resp.data;
        this.nameCategory = this.dataCategory.categoryName;
        this.descriptionCategory = this.dataCategory.description;
      })
    }
  }

  formAddCategory = this.fb.group({
    "categoryName" :['', [Validators.required]],
    "description" :['', [Validators.required]],
  })
  addProduct() {
    console.log('them 1 danh mục mới');
    console.log(this.formAddCategory.value)
    let categoty;
    if(this.id ==0 || !this.id){
      categoty = new CategoryModel(this.id, this.formAddCategory.value.categoryName!,
        this.formAddCategory.value.description!, new Date().getTime(), new Date().getTime());
    }
    else{
      categoty = new CategoryModel(this.id, this.formAddCategory.value.categoryName!,
        this.formAddCategory.value.description!, this.dataCategory.createdDate, new Date().getTime());
    }

    this.categoryService.addCategory(categoty).subscribe(x =>{
         console.log(x)
         location.reload();
         this.modalRef.close()
    })
  }

  get f(){
    return this.formAddCategory.controls;
  }

}
