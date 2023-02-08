import {Component, OnDestroy, OnInit} from '@angular/core';
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ModalCategotyComponent} from "../quan-ly-loai-san-pham/modal-categoty/modal-categoty.component";
import {SizemodalComponent} from "./sizemodal/sizemodal.component";
import {SizeService} from "./_services/size.service";
import {PageSizeRequestModel} from "./_models/pagesizerequest.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ISearchView} from "../model_common/search.models";
import {debounceTime, distinctUntilChanged, Subject, Subscription, takeUntil} from "rxjs";
import {ModalDeleteComponent} from "../quan-ly-loai-san-pham/modal-delete/modal-delete.component";
import {SizemodalDeleteComponent} from "./sizemodal-delete/sizemodal-delete.component";

@Component({
  selector: 'app-quan-ly-size',
  templateUrl: './quan-ly-size.component.html',
  styleUrls: ['./quan-ly-size.component.scss']
})
export class QuanLySizeComponent implements OnInit,OnDestroy, ISearchView{
  modalRef: MdbModalRef<ModalCategotyComponent> | null = null;

  dataTable: any
  sub!: Subscription;
  private destroy$ = new Subject();
  defautPageReq = new PageSizeRequestModel('', 0, 10000000);
  constructor(private modalService: MdbModalService,
              private sizeService: SizeService,
              private fb: FormBuilder
              ) {}

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    }
  openModal(id: number) {
    this.modalRef = this.modalService.open(SizemodalComponent, {
      data:{
        id: id
      }
    })
  }


  ngOnInit(): void {
    this.searchForm();
    this.sizeService.findSize(this.defautPageReq).subscribe(x =>{
      this.dataTable = x.data
    })
  }

  searchGroup!: FormGroup;

  search(searchTerm: string): void {
    this.dataSearch(searchTerm);
  }

  dataSearch(searchTerm: string){
    let pageReq = new PageSizeRequestModel(searchTerm, 0, 10000);
    return this.sizeService.findSize(pageReq).subscribe(x =>{
      this.dataTable = x.data;
    })
  }

  searchForm(): void {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    this.searchGroup.controls['searchTerm'].valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => {
        this.search(val);
      })
  }

  openModalDelete(name: string, id: number) {
    this.modalRef = this.modalService.open(SizemodalDeleteComponent, {
      modalClass: 'modal-dialog-centered',
      data: {name: name,
        id: id}
    });
  }

  refresh() {
    this.ngOnInit();
  }
}
