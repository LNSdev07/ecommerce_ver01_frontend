import {Component, OnInit} from '@angular/core';
import {ISearchView} from "../model_common/search.models";
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {MdbModalRef, MdbModalService} from "mdb-angular-ui-kit/modal";
import {ColorModalComponent} from "../quan-ly-color/_modal/color-modal/color-modal.component";
import {DeleteColorModalComponent} from "../quan-ly-color/_modal/delete-color-modal/delete-color-modal.component";
import {DiscountModalComponent} from "./_modal/discount-modal/discount-modal.component";
import {IFilterView} from "../model_common/filter.model";
import {DiscountRequestModel} from "./_models/discountRequest.model";
import {DiscountService} from "./_services/discount.service";
import {DeleteDiscountModalComponent} from "./_modal/delete-discount-modal/delete-discount-modal.component";

@Component({
  selector: 'app-quan-ly-discount',
  templateUrl: './quan-ly-discount.component.html',
  styleUrls: ['./quan-ly-discount.component.scss']
})
export class QuanLyDiscountComponent implements OnInit, ISearchView, IFilterView{
  modalRef: MdbModalRef<DiscountModalComponent> | null = null;
  searchGroup!: FormGroup;
  filterGroup!: FormGroup;
  private destroy$ = new Subject();
  dataTable : any
  page =1;
  pageSize =5;
  count =0;
  currentIndex = -1;


  defautDisReq = new DiscountRequestModel(0, 100000, '', 0, 100);

  constructor(private fb: FormBuilder,
              private modalService: MdbModalService,
              private discountService: DiscountService) {
  }

  openModal(id: number) {
    this.modalRef = this.modalService.open(DiscountModalComponent, {
      data:{
        id: id
      }
    })
  }

  openModalDelete(discountName: string, id: number) {
    this.modalRef = this.modalService.open(DeleteDiscountModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {name: discountName,
        id: id}
    });
  }

  ngOnInit(): void {
    this.searchForm();
    this.filterForm();
    this.discountService.findDiscount(this.defautDisReq).subscribe(x =>{
      this.dataTable = x.data;
    })
  }
  refresh() {
     this.ngOnInit();
  }



  search(searchTerm: string): void {
   this.fetchDataTable();
  }

  fetchDataTable(){
    const textSearch = this.getParamSearch();
    const filter = this.getParamFilter();
    // @ts-ignore
    const minDis = filter['minDis'];
    // @ts-ignore
    const maxDis = filter['maxDis'];

    const request = new DiscountRequestModel(0, 1000000, textSearch,
      minDis, maxDis);

    this.discountService.findDiscount(request).subscribe(x =>{
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

  filter(): void {
    const filter = {};
    // @ts-ignore
    const minDis = this.filterGroup.get('minDis').value;
    // @ts-ignore
    const maxDis = this.filterGroup.get('maxDis').value;
    // @ts-ignore
    filter['minDis'] = minDis;
    // @ts-ignore
    filter['maxDis'] = maxDis;
     this.fetchDataTable();
  }

  filterForm(): void {
    this.filterGroup = this.fb.group({
      minDis: ['0'],
      maxDis:['100']
    })


    this.filterGroup.controls['minDis'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.filter()
      );
    this.filterGroup.controls['maxDis'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.filter()
      );
  }

  getParamSearch(): string{
    return this.searchGroup.controls['searchTerm'].value;
  }

  getParamFilter(): {}{
    const filter = {};
    // @ts-ignore
    const minDis = this.filterGroup.get('minDis').value;
    // @ts-ignore
    const maxDis = this.filterGroup.get('maxDis').value;
    // @ts-ignore
    filter['minDis'] = minDis;
    // @ts-ignore
    filter['maxDis'] = maxDis;
    return filter;
  }

  handlePageChange($event: number) {
    this.page = $event;
  }
}
