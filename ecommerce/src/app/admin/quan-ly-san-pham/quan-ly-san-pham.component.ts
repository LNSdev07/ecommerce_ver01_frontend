import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {FormBuilder, FormGroup} from "@angular/forms";
import {IFilterView} from "./_models/filter.model";
import {debounceTime, distinctUntilChanged, Subject, Subscription, takeUntil} from "rxjs";
import {ISearchView} from "./_models/search.model";
import {ProductService} from "./_services/product.service";
import {CostRequestPage, PageProductModel, QuantityRequestPage} from "./_models/pageproduct.model";
import {CategoryService} from "../quan-ly-loai-san-pham/_services/category.service";
import {pageRequestModel} from "../quan-ly-loai-san-pham/_models/pageRequest.model";
import {MatDialog} from "@angular/material/dialog";
import {AddProductModalComponent} from "./_modals/add-product-modal/add-product-modal.component";
@Component({
  selector: 'app-quan-ly-san-pham',
  templateUrl: './quan-ly-san-pham.component.html',
  styleUrls: ['./quan-ly-san-pham.component.scss']
})
export class QuanLySanPhamComponent implements IFilterView, ISearchView, OnInit, OnDestroy {

  filterGroup!: FormGroup;
  searchGroup!: FormGroup;
  private destroy$ = new Subject();

  count = 0;

  dataTable: any


  constructor(private modalService: MdbModalService,
              private fb: FormBuilder,
              private productService: ProductService,
              public dialog: MatDialog,
              private categoryService: CategoryService) {}
  page = 1;
  pageSize = 6;
  pageSizes = [3, 6, 9];
  currentIndex = -1;
  private defautPageRequest = new PageProductModel('', 0,
    1000000, new CostRequestPage(0, 100000000), new QuantityRequestPage(0, 100000000));


  ngOnInit(): void {
    this.filterForm();
    this.searchForm();

    this.productService.findProduct(this.defautPageRequest).subscribe(x =>{
      this.dataTable = x.data;
      this.count = x.totalItems
      console.log(x)
    })

    this.getCaterory();

  }

  openModal() {

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

    let pageReq = new PageProductModel(this.getParamSearch(), 0,
      1000000, this.getParamCostFilter(),
      this.getParamQuantityFilter());

    this.retrieveData(pageReq);
  }

  filterForm(): void{
    this.filterGroup = this.fb.group({
      costMin: ['0'],
      costMax: ['10000'],
      quantityMin: ['0'],
      quantityMax: ['10000']
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
      console.log(x);
      this.dataTable = x.data;
      this.count = x.totalItems
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
    let pageReq = new PageProductModel(searchTerm, 0,
      1000000, this.getParamCostFilter(),
      this.getParamQuantityFilter());

    this.retrieveData(pageReq);
  }


  handlePageChange($event: number) {
    this.page = $event;
  }

  refresh() {
    this.ngOnInit();
  }

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

  dataCategories : any

  getCaterory(){
    let request = new pageRequestModel(0, this.pageSize, '');

    this.categoryService.findCategory(request).subscribe(x =>{
      this.dataCategories = x.data;
      console.log(x.data)
    })
  }
  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProductModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
