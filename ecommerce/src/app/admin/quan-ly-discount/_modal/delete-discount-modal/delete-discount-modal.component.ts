import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {ColorService} from "../../../quan-ly-color/_services/color.service";
import {DiscountService} from "../../_services/discount.service";

@Component({
  selector: 'app-delete-discount-modal',
  templateUrl: './delete-discount-modal.component.html',
  styleUrls: ['./delete-discount-modal.component.scss']
})
export class DeleteDiscountModalComponent {
  name!: string
  id!: number
  constructor(public modalRef: MdbModalRef<DeleteDiscountModalComponent>,
              private discountService: DiscountService){

  }

  Delete() {
    if(this.id){
      console.log(this.id)
      console.log(this.name)
      this.discountService.deleteById(this.id).subscribe(resp =>{
        console.log(resp.message);
        location.reload();
      })
    }
  }
}
