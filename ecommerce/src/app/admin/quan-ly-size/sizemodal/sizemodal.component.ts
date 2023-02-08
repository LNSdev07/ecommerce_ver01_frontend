import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {FormBuilder, Validators} from "@angular/forms";
import {SizeModel} from "../_models/size.model";
import {SizeService} from "../_services/size.service";

@Component({
  selector: 'app-sizemodal',
  templateUrl: './sizemodal.component.html',
  styleUrls: ['./sizemodal.component.scss']
})
export class SizemodalComponent implements OnInit {

  name!: string
  id!: number
  constructor(public modalRef: MdbModalRef<SizemodalComponent>,
              private fb : FormBuilder,
              private sizeService: SizeService) {}

  sizeName ='Size Name'
  sizeCode ='Size Code'

  createdDate!: number

  ngOnInit(): void {
    console.log(this.id)
    if(this.id){
       this.sizeService.getSizeById(this.id).subscribe(x =>{
         this.sizeCode = x.data.sizeCode
         this.sizeName = x.data.sizeName
         this.createdDate = x.data.createdDate
       })
    }
  }


  formAddSize = this.fb.group({
     "nameSize": ['', [Validators.required]],
     "codeSize": ['', [Validators.required]]
    }
  )

  get f(){
    return this.formAddSize.controls;
  }

  addSize() {
    let sizeName = this.formAddSize.controls['nameSize'].value;
    let sizeCode = this.formAddSize.controls['codeSize'].value;

    let sizeModel;

    if(this.id == 0){
       sizeModel = new SizeModel(0, sizeCode!, sizeName!, new Date().getTime(), new Date().getTime());
    }
    else{
       sizeModel = new SizeModel(this.id, sizeCode!, sizeName!, this.createdDate, new Date().getTime());
    }
    this.sizeService.addSize(sizeModel).subscribe(x =>{
      console.log(x.message);
      location.reload();
    });


  }
}
