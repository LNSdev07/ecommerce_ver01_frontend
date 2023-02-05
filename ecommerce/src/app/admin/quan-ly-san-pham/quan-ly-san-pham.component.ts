import { Component } from '@angular/core';
import {ModalComponent} from "./modal/modal.component";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IFilterView} from "./_models/filter.model";
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from "rxjs";
import {ISearchView} from "./_models/search.model";
import {ProductService} from "./_services/product.service";
import {CostRequestPage, PageProductModel, QuantityRequestPage} from "./_models/pageproduct.model";
@Component({
  selector: 'app-quan-ly-san-pham',
  templateUrl: './quan-ly-san-pham.component.html',
  styleUrls: ['./quan-ly-san-pham.component.scss']
})
export class QuanLySanPhamComponent implements IFilterView, ISearchView{

  filterGroup!: FormGroup;
  searchGroup!: FormGroup;
  private destroy$ = new Subject();

  count = 0;

  dataTable: any
  modalRef: MdbModalRef<ModalComponent> | null = null;

  constructor(private modalService: MdbModalService,
              private fb: FormBuilder,
              private productService: ProductService) {}
  page = 1;
  pageSize = 6;
  pageSizes = [3, 6, 9];
  currentIndex = -1;
  private defautPageRequest = new PageProductModel('', 0,
    1000, new CostRequestPage(0, 100000000), new QuantityRequestPage(0, 100000000));


  ngOnInit(): void {
    this.filterForm();
    this.searchForm();

    this.productService.findProduct(this.defautPageRequest).subscribe(x =>{
      this.dataTable = x.data;
      this.count = x.totalItems
      console.log(x)
    })

  }

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { title: 'Lại Ngọc Sơn' },
    });
  }

  filter(){
    const filter = {};
    // @ts-ignore
    const costMin = this.filterGroup.get('costMin').value;
    // @ts-ignore
    const costMax = this.filterGroup.get('costMax').value;
    // @ts-ignore
    const quantityMin = this.filterGroup.get('quantityMin').value;
    // @ts-ignore
    const quantityMax = this.filterGroup.get('quantityMax').value;
    if (costMin && costMax && quantityMin && quantityMax ) {
      // @ts-ignore
      filter['costMin'] = costMin;
      // @ts-ignore
      filter['costMax'] = costMax;
      // @ts-ignore
      filter['quantityMin'] = quantityMin;
      // @ts-ignore
      filter['quantityMax'] = quantityMax;
    }
    console.log(filter)
    console.log(this.searchGroup.controls['searchTerm'].value)
  }

  filterForm(): void{
    this.filterGroup = this.fb.group({
      costMin: ['0'],
      costMax: ['100'],
      quantityMin: ['0'],
      quantityMax: ['100']
    });
    this.filterGroup.controls['costMin'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.filter()
      );

    this.filterGroup.controls['costMax'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.filter()
      );

    this.filterGroup.controls['quantityMin'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.filter()
      );

    this.filterGroup.controls['quantityMax'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.filter()
      );
  }

  searchForm():any {
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

  retrieveData(pageReq: PageProductModel){
    this.productService.findProduct(pageReq).subscribe(x =>{
      console.log(x)
      this.dataTable = x.data;
    })
  }

  getParamCostFilter(): CostRequestPage{
    let costMin = this.filterGroup.controls['costMin'].value;
    let costMax = this.filterGroup.controls['costMax'].value;
    return new CostRequestPage(costMin, costMax);
  }

  getParamQuantityFilter():QuantityRequestPage{
    let quantityMin = this.filterGroup.controls['quantityMin'].value;
    let quantityMax = this.filterGroup.controls['quantityMax'].value;
    return new QuantityRequestPage(quantityMin, quantityMax);
  }

  getParamSearch(): string{
    return this.searchGroup.controls['searchTerm'].value;
  }


  search(searchTerm: string): void {
    let pageReq = new PageProductModel(searchTerm, this.page-1,
      this.pageSize, this.getParamCostFilter(),
      this.getParamQuantityFilter());

    this.retrieveData(pageReq);
  }


  handlePageChange($event: number) {
    this.page = $event;
  //   let pageReq = new PageProductModel(this.getParamSearch(), this.page-1,
  //     this.pageSize, this.getParamCostFilter(),
  //     this.getParamQuantityFilter());
  //   console.log(pageReq)
  //
  //   this.retrieveData(pageReq);
  }
}
