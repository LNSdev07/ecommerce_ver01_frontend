import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {SizeService} from "../_services/size.service";

@Component({
  selector: 'app-sizemodal-delete',
  templateUrl: './sizemodal-delete.component.html',
  styleUrls: ['./sizemodal-delete.component.scss']
})
export class SizemodalDeleteComponent {
  name!: string
  id!: number
  constructor(public modalRef: MdbModalRef<SizemodalDeleteComponent>,
              private sizeService: SizeService) {}

  Delete() {
    console.log(this.id)
    if(this.id){
      console.log(this.id)
      this.sizeService.deleteBySizeId(this.id).subscribe(resp =>{
        console.log(resp.message);
        location.reload();
      })
    }
  }

}
