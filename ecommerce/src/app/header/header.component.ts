import { Component } from '@angular/core';
import {TokenService} from "../service_common/token.service";
import {Router} from "@angular/router";
import {SignUpForm} from "../signup/_models/SignUpForm";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

   checkLogin = false
   urlAvatar!: string;
   nameUser!: string;
   constructor(private tokenService: TokenService,
               private router: Router) {
   }
   ngOnInit(): void{
          if(this.tokenService.getToken()){
            this.checkLogin = true;
            this.nameUser = this.tokenService.getName();
            this.urlAvatar = this.tokenService.getAvatar();
          }
   }

   logOut(){
     console.log('logout')
     localStorage.clear();
     this.router.navigate(['']).then(()=>{
       location.reload();
     })
   }
}
