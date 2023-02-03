import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {SignUpForm} from "./_models/SignUpForm";
import {SignupService} from "./_services/signup.service";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent {
  hide = true;
  form: any ={};
  status = '';

  selectFile!: File;
  fileInFireBase!: AngularFireStorageReference
  urlFile!: string;
  @Output()
  urlFromFireBase = new EventEmitter<string>();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])

  signUpForm!: SignUpForm;
  error1: any={
    message :"nouser"
  }

  error2 : any ={
    message :"noemail"
  }

  success: any ={
    message :"success"
  }
  selectedValue!: string;

   constructor(private signUpService: SignupService,
               private afService: AngularFireStorage,
               private fb: FormBuilder) {
   }

  gender =[
    {id: 1, value: 'Nam'},
    {id: 0, value: 'Nữ'}
  ]

  statusGender = ''


  ngSubmit() {
    if (!this.urlFile) {
      this.urlFile = 'https://cdn3.iconfinder.com/data/icons/login-5/512/LOGIN_6-512.png';
    }
    if (isNaN(Number(this.selectedValue))) {
      this.statusGender = 'The gender is required !';
    } else {
      this.signUpForm = new SignUpForm(
        this.form.email,
        this.form.username,
        this.form.password,
        this.form.name,
        this.urlFile,
        Number(this.selectedValue),
        this.form.phonenumber,
        this.form.address,
      );
      console.log(this.signUpForm);

      this.signUpService.signUp(this.signUpForm).subscribe(data =>{
        console.log(data);
        if(JSON.stringify(data) == JSON.stringify(this.error1)){
          this.status = 'this username is existed!!!. Please try again'
        }
        if(JSON.stringify(data) == JSON.stringify(this.error2)){
          this.status = 'this email is existed!!!. Please try again'
        }
        if(JSON.stringify(data) == JSON.stringify(this.success)){
          this.status = 'success'
        }
      })
    }
  }

  onChangeFile($event: Event) {
    console.log($event)
    // @ts-ignore
    this.selectFile = $event.target.files[0];
    console.log(this.selectFile)
    this.upload();
    console.log(this.urlFile)
  }

  upload(){
    console.log('upload image firebase!!!')
    this.fileInFireBase = this.afService.ref(this.selectFile.name);
    this.fileInFireBase.put(this.selectFile).then(data =>{
      return data.ref.getDownloadURL(); // tra ve 1 duong dan tu firebase
      // console.log(data.ref.getDownloadURL())
    }).then(url =>{
      this.urlFile = url;
      this.urlFromFireBase.emit(this.urlFile);
      return this.urlFile;
    }).catch(error =>{
      `upload file failed! ${error}`
    });
  }
}
