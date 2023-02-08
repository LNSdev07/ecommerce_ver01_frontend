import {Component, OnInit} from '@angular/core';
import {MdbModalRef} from "mdb-angular-ui-kit/modal";
import {FormBuilder, Validators} from "@angular/forms";
import {ColorService} from "../../_services/color.service";
import {SizeModel} from "../../../quan-ly-size/_models/size.model";
import {ColorModel} from "../../_models/color.model";

@Component({
  selector: 'app-color-modal',
  templateUrl: './color-modal.component.html',
  styleUrls: ['./color-modal.component.scss']
})
export class ColorModalComponent implements OnInit{

  private createdDate!: number
  constructor(public modalRef: MdbModalRef<ColorModalComponent>,
              private colorService: ColorService,
              private fb : FormBuilder){}

  id!: number
  colorName= 'Color Name';
  colorCode= 'Color Code';

  ngOnInit(): void {
    if(this.id != 0){
      this.colorService.getById(this.id).subscribe(x =>{
        this.colorCode = x.data.colorCode
        this.colorName = x.data.colorName
        this.createdDate = x.data.createdDate
      })
    }
  }
  formAddColor = this.fb.group({
    "colorName": ['', [Validators.required]],
    "colorCode": ['', [Validators.required]]
  })



  get f(){
    return this.formAddColor.controls;
  }


  addColor() {
    let colorName = this.formAddColor.controls['colorName'].value;
    let colorCode = this.formAddColor.controls['colorCode'].value;

    let colorModel;

    if(this.id == 0){
      colorModel = new ColorModel(0, colorCode!, colorName!, new Date().getTime(), new Date().getTime());
    }
    else{
      colorModel = new ColorModel(this.id, colorCode!, colorName!, this.createdDate, new Date().getTime());
    }
    this.colorService.addColor(colorModel).subscribe(x =>{
      console.log(x.message);
      location.reload();
    });

  }


}
