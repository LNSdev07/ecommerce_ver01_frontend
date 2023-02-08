import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {FormBuilder, Validators} from "@angular/forms";
import {DiscountService} from "../../_services/discount.service";
import {DiscountModel} from "../../_models/discount.model";

@Component({
  selector: 'app-discount-modal',
  templateUrl: './discount-modal.component.html',
  styleUrls: ['./discount-modal.component.scss']
})
export class DiscountModalComponent {
  private createdDate!: number
  constructor(public modalRef: MdbModalRef<DiscountModalComponent>,
              private discountService: DiscountService,
              private fb : FormBuilder){}

  id!: number
  discountName= 'Discount Name';
  discountPercent= 'Discount Percent';

  ngOnInit(): void {
    if(this.id != 0){
      this.discountService.getById(this.id).subscribe(x =>{
        this.discountPercent = x.data.discountPercent
        this.discountName = x.data.discountName
        this.createdDate = x.data.createdDate
      })
    }
  }
  formAddDisCount = this.fb.group({
    "discountName": ['', [Validators.required]],
    "discountPercent": ['', [Validators.required]]
  })


  get f(){
    return this.formAddDisCount.controls;
  }


  addColor() {
    console.log('vao day')
    let discountName = this.formAddDisCount.controls['discountName'].value;
    let discountPercent = this.formAddDisCount.controls['discountPercent'].value;

    // @ts-ignore
    let discount = Math.floor(discountPercent);

    let discountModel;

    if(this.id == 0){
      discountModel = new DiscountModel(0, discountName!, discount!, new Date().getTime(), new Date().getTime());
    }
    else{
      discountModel = new DiscountModel(this.id, discountName!, discount!, this.createdDate, new Date().getTime());
    }
    this.discountService.addDiscount(discountModel).subscribe(x =>{
      console.log(x.message);
      location.reload();
    });
  }
}
