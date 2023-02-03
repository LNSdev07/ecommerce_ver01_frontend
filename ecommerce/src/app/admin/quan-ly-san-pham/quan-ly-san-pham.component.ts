import { Component } from '@angular/core';
import {ModalComponent} from "./modal/modal.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
@Component({
  selector: 'app-quan-ly-san-pham',
  templateUrl: './quan-ly-san-pham.component.html',
  styleUrls: ['./quan-ly-san-pham.component.scss']
})
export class QuanLySanPhamComponent {


  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { title: 'Lại Ngọc Sơn' },
    });
  }

  paginate($event: any) {
    console.log($event)
  }


}
