import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {ColorService} from "../../_services/color.service";

@Component({
  selector: 'app-delete-color-modal',
  templateUrl: './delete-color-modal.component.html',
  styleUrls: ['./delete-color-modal.component.scss']
})
export class DeleteColorModalComponent {

  name!: string
  id!: number
  constructor(public modalRef: MdbModalRef<DeleteColorModalComponent>,
              private colorService: ColorService){

  }

  Delete() {
    if(this.id){
      console.log(this.id)
      this.colorService.deleteById(this.id).subscribe(resp =>{
        console.log(resp.message);
        location.reload();
      })
    }
  }
}
