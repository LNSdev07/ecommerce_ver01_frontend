import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {TokenService} from "../service_common/token.service";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";
import {SignupService} from "../signup/_services/signup.service";
import {SignUpForm} from "../signup/_models/SignUpForm";
import {ProfileService} from "./_services/profile.service";
import {ProfileModel} from "./_models/profile.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit{
  profileModel = new ProfileModel();
  form: any={};
  hide = true;

  selectFile!: File;
  fileInFireBase!: AngularFireStorageReference

  urlAvt!: string;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  password_again!: string;
  signUpForm!: SignUpForm;
  status ='';
  private urlFile!: string;

  placeHodersGender ='';

  error1 = 'nouser';
  error2 = 'noemail'
  success= 'success'

  constructor(private tokenService: TokenService,
              private afService: AngularFireStorage,
              private signUpService: SignupService,
              private profileService: ProfileService,
              private route: Router) {
  }

  gender =[
    {id: 1, value: 'Nam'},
    {id: 0, value: 'Nữ'}
  ]

  statusGender = ''
  selectedValue: any;

  ngSubmit() {
    this.urlFile = this.checkChangeImage();
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

      this.profileService.changeInfoUser(this.signUpForm).subscribe(data =>{
        console.log(data);

        if(JSON.stringify(data.message) == JSON.stringify(this.error1)){
          this.status = 'this username is existed!!!. Please try again'
          console.log('ton tai user')
        }
        else if(JSON.stringify(data.message) == JSON.stringify(this.error2)){
          this.status = 'this email is existed!!!. Please try again'
          console.log('ton tai email')
        }
        else if(JSON.stringify(data.message) == JSON.stringify(this.success)){
          this.status = 'success';
        }
        else {
          this.tokenService.setToken(data.token);
          this.tokenService.setName(data.name);
          this.tokenService.setRoles(data.roles);
          this.tokenService.setAvatar(data.avatar)

          this.route.navigate(['/login']);
          // location.reload();
          console.log('vao day r')
        }
      })
    }
  }


  ngOnInit(): void {
    if(this.tokenService.getAvatar() != null){
      this.urlAvt = this.tokenService.getAvatar();
    }

      this.profileService.getInforUse().subscribe(data =>{
        this.profileModel = data;
        this.placeHodersGender = data.gender == 1? 'Nam': 'Nữ';
      })

  }

  onChangeFile($event: Event) {
    // @ts-ignore
    this.selectFile = $event.target.files[0]
    console.log(this.selectFile)
    this.upload();
  }

  checkChangeImage(): string{
    if(this.urlAvt != this.tokenService.getAvatar()){
      return this.urlAvt;
    }
    else return this.tokenService.getAvatar();
  }

  upload(){
    console.log('upload image firebase!!!')
    this.fileInFireBase = this.afService.ref(this.selectFile.name);
    this.fileInFireBase.put(this.selectFile).then(data =>{
      return data.ref.getDownloadURL(); // tra ve 1 duong dan tu firebase
      // console.log(data.ref.getDownloadURL())
    }).then(url =>{
      this.urlAvt = url;
    }).catch(error =>{
      `upload file failed! ${error}`
    });
  }


  // test() {
  //   this.profileService.getInforUse().subscribe(data =>{
  //     console.log(data)
  //   })
  // }
}
