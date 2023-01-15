import { Component, OnInit } from '@angular/core';
import { ShopModel } from './_models/shop.model';
import { ShopService } from './_services/shop.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {
 
  // form lay property sort
  public sortGroup : FormGroup = new FormGroup({
    sortProperty: new FormControl(''),
  })


  dataFilterSize: string[] =[];

  listSize =[
    {
      id: 'size1',
      value: 'L',
      nameSize: 'L Large',
      isChecked: false
    },
    {
      id: 'size2',
      value: 'XL',
      nameSize: 'XL Extra Large',
      isChecked: false
    },
    {
      id: 'size3',
      value: 'M',
      nameSize: 'M Medium',
      isChecked: false
    },
    {
      id: 'size4',
      value: 'S',
      nameSize: 'S Small',
      isChecked: false
    },
    {
      id: 'size5',
      value: 'XS',
      nameSize: 'XS Extra Small',
      isChecked: false
    }
  ]

  optionsSort = [
    // { name: "Default sorting", value: 0 },
    // { name: "Sort by popularity", value: 1 },
    // { name: "Sort by average rating", value: 2 },
    { name: "Sort by price: low to high", value: 3 },
    { name: "Sort by price: high to low", value: 4 }
  ]

  optionColor =[
    {
      id: 1,
      colorCode: 'custom-control-label sky-blue',
      isChecked: false
    },
    {
      id: 2,
      colorCode: 'custom-control-label red',
      isChecked: false
    },
    {
      id: 3,
      colorCode: 'custom-control-label dark',
      isChecked: false
    },
    {
      id: 4,
      colorCode: 'custom-control-label yellow',
      isChecked: false
    }
  ]
 


  datas:ShopModel[]=[];
  private current_Page =1;
  private total_Page = 0;
  constructor(
    public fb: FormBuilder,
    private shopService: ShopService){

  }


  ngOnInit(): void {
    this.shopService.getProduct('3','', '',1 ).subscribe(res =>{
       console.log(res.data)
       this.total_Page = res.data.totalPage;
       this.datas = res.data.data;
    })
  }


  changePage(id: number){
    this.current_Page = id;
    if(this.current_Page <= this.total_Page){
      this.shopService.getProduct(this.getSortBy(), this.getColors(), this.getSizes(), this.current_Page).subscribe(res =>{
        this.datas = res.data.data;
      })
    }
    else{
      this.current_Page-=1
    }
    console.log(this.current_Page)
  }

  previousPage(){
      this.current_Page -=1;
      if(this.current_Page <= this.total_Page && this.current_Page >=1){
        this.shopService.getProduct(this.getSortBy(), this.getColors(), this.getSizes(), this.current_Page).subscribe(res =>{
          this.datas = res.data.data;
        })
      }
      else{
        this.current_Page+=1
      }
      console.log(this.current_Page)
  }

  nextPage(){
    this.current_Page +=1;
    if(this.current_Page <= this.total_Page){
      this.shopService.getProduct(this.getSortBy(), this.getColors(), this.getSizes(), this.current_Page).subscribe(res =>{
        this.datas = res.data.data;
      })
    }
    else{
      this.current_Page-=1
    }
    console.log(this.current_Page)
  }
  

  filterData(){

    
    let sorts ='' + this.sortGroup.value.sortProperty;
    let colors =''
    let sizes =''

   if(this.selectedItemsList != undefined){
    this.selectedItemsList.forEach((_element: any) => {
      sizes+=_element.value+',';
   });
   }
   if(this.selectColorItems != undefined){
    this.selectColorItems.forEach((x:any) =>{
      colors+=x.id+','; 
   })
   }

   this.shopService.getProduct(this.getSortBy(), this.getColors(), this.getSizes(), this.current_Page).subscribe(res =>{
    this.datas = res.data.data;
  })
  }

  getSortBy(){
    let sorts ='' + this.sortGroup.value.sortProperty;
    return sorts;
  }

  getColors(){
    let colors ='';
    if(this.selectColorItems != undefined){
      this.selectColorItems.forEach((x:any) =>{
        colors+=x.id+','; 
     })
     }
    return colors;
  }

  getSizes(){
    let sizes ='';
    if(this.selectedItemsList != undefined){
      this.selectedItemsList.forEach((_element: any) => {
        sizes+=_element.value+',';
     });
     }
    return sizes;
  }
   

  // xu ly filter theo properties

  // 1,  lay property size
  changeSelection() {
    this.fetchSelectedItems()
  }

  selectedItemsList: any

  fetchSelectedItems() {
      this.selectedItemsList = this.listSize.filter((value, index) => {
      return value.isChecked
    });
  }

  // 2, filter color

  selectColorItems :any;

  changeColor(){
    this.selectColorItems = this.optionColor.filter((value, index) => {
      return value.isChecked
    });

  }


}
