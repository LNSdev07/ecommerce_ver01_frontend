import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import {SignInForm} from "./_models/SignInForm";
import {LoginService} from "./_services/login.service";
import {TokenService} from "../service_common/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = FormGroup;
  signInForm!: SignInForm;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
               private loginService: LoginService,
               private tokenService: TokenService,
               private router: Router){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_me: ['']
      });
  }
  //Add user form actions
  status: any;
  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.signInForm = new SignInForm(
        this.loginForm.value.username,
        this.loginForm.value.password
      )
      // console.log(this.signInForm);
      this.loginService.signIn(this.signInForm).subscribe(data =>{
        // console.log(data)
        if(data != undefined){
          this.tokenService.setToken(data.token);
          this.tokenService.setName(data.name);
          this.tokenService.setRoles(data.roles);
          this.tokenService.setAvatar(data.avatar)
          // ddieu huong tu ts ve comopnent
          this.router.navigate(['']).then(()=>{
            location.reload();
          })
        }
        // @ts-ignore
        if(data.status === 202){
              console.log('login fail')
          this.status = 'Login failed! Please check your username or password!'
        }
      })
    }

  }
}
