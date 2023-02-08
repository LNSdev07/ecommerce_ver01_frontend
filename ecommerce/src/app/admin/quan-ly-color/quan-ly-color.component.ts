import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISearchView} from "../model_common/search.models";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ColorModalComponent} from "./_modal/color-modal/color-modal.component";
import {ColorRequestModel} from "./_models/colorRequest.model";
import {ColorService} from "./_services/color.service";
import {SizemodalDeleteComponent} from "../quan-ly-size/sizemodal-delete/sizemodal-delete.component";
import {DeleteColorModalComponent} from "./_modal/delete-color-modal/delete-color-modal.component";



@Component({
  selector: 'app-quan-ly-color',
  templateUrl: './quan-ly-color.component.html',
  styleUrls: ['./quan-ly-color.component.scss']
})
export class QuanLyColorComponent implements OnInit,OnDestroy, ISearchView {
  modalRef: MdbModalRef<ColorModalComponent> | null = null;
  searchGroup!: FormGroup;
  dataTable: any;
  private destroy$ = new Subject();

  pageSize = 5
  page =1;
  count =0;
  currentIndex =-1

  defautReq = new ColorRequestModel(0, 100000, '');

  constructor(private fb: FormBuilder,
              private colorService: ColorService,
              private modalService: MdbModalService) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.searchForm();
    this.colorService.findColor(this.defautReq).subscribe(x =>{
      this.dataTable = x.data;
    })
  }

  search(searchTerm: string): void {
    let colorReq = new ColorRequestModel(0, 100000, searchTerm);
    this.colorService.findColor(colorReq).subscribe(x =>{
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

  refresh() {
    this.ngOnInit();
  }

  openModal(id: number) {
    this.modalRef = this.modalService.open(ColorModalComponent, {
      data:{
        id: id
      }
    })
  }


  openModalDelete(sizeName: string, id: number) {
    this.modalRef = this.modalService.open(DeleteColorModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {name: sizeName,
        id: id}
    });
  }

  handlePageChange($event: number) {
    this.page = $event;
  }
}
