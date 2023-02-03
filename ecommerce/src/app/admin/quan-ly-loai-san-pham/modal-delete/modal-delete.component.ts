import { Component } from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {CategoryService} from "../_services/category.service";

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {

  name!: string
  id!: number
  constructor(public modalRef: MdbModalRef<ModalDeleteComponent>,
              private categoryService: CategoryService) {}

  Delete() {
     if(this.id){
         this.categoryService.deteteById(this.id).subscribe(resp =>{
           console.log(resp.message);
           location.reload();
         })
     }
  }
}
