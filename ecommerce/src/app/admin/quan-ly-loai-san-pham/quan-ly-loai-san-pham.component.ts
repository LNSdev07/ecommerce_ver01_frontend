import {Component, OnInit} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ModalCategotyComponent} from "./modal-categoty/modal-categoty.component";
import {CategoryService} from "./_services/category.service";
import {pageRequestModel} from "./_models/pageRequest.model";
import {ModalDeleteComponent} from "./modal-delete/modal-delete.component";

@Component({
  selector: 'app-quan-ly-loai-san-pham',
  templateUrl: './quan-ly-loai-san-pham.component.html',
  styleUrls: ['./quan-ly-loai-san-pham.component.scss']
})
export class QuanLyLoaiSanPhamComponent implements OnInit{
  modalRef: MdbModalRef<ModalCategotyComponent> | null = null;
  public pageSize =6;
  public curPage = 0;

  public textSearch ='';

  constructor(private modalService: MdbModalService,
              private categoryService: CategoryService) {}


  openModal(id: number) {
    this.modalRef = this.modalService.open(ModalCategotyComponent, {
      data: { id: id },
    });
  }

  dataTable: any
  totalPage =0;


  ngOnInit(): void {
    let request = new pageRequestModel(0, this.pageSize, '');

    this.categoryService.findCategory(request).subscribe(x =>{
      this.totalPage = x.totalPage;
      this.dataTable = x.data;
    })
  }

  changePage(page: number) {
    console.log(page)
    if(page -1 < this.totalPage){
        this.curPage = page-1;
        let request = new pageRequestModel(page-1, this.pageSize, this.textSearch);
        this.categoryService.findCategory(request).subscribe(x =>{
          this.totalPage = x.totalPage;
          this.dataTable = x.data;
        })
    }
  }

  nextPage() {
    if(this.curPage < this.totalPage-1){
      console.log(this.curPage)
      this.curPage+=1
      let request = new pageRequestModel(this.curPage, this.pageSize, this.textSearch);
      this.categoryService.findCategory(request).subscribe(x =>{
        this.totalPage = x.totalPage;
        this.dataTable = x.data;
      })
    }
  }

  previousPage() {
    if(this.curPage > 0){
      console.log(this.curPage)
      this.curPage-=1
      let request = new pageRequestModel(this.curPage, this.pageSize, this.textSearch);
      this.categoryService.findCategory(request).subscribe(x =>{
        this.totalPage = x.totalPage;
        this.dataTable = x.data;
      })
    }
  }

  search() {
    console.log('vao day')
    let request = new pageRequestModel(0, this.pageSize, this.textSearch);

    this.categoryService.findCategory(request).subscribe(x =>{
      this.totalPage = x.totalPage;
      this.dataTable = x.data;
    })
  }

  openModalDelete(name: string, id: number) {
    this.modalRef = this.modalService.open(ModalDeleteComponent, {
      modalClass: 'modal-dialog-centered',
      data: {name: name,
              id: id}
    });
  }
}
