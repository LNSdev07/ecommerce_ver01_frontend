import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
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




   constructor(private signUpService: SignupService,
               private afService: AngularFireStorage) {
   }

  ngSubmit() {
    this.signUpForm = new SignUpForm(
      this.form.email,
      this.form.username,
      this.form.password,
      this.form.name,
      this.urlFile
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
