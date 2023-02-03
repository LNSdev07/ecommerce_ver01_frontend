import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {TokenService} from "../service_common/token.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private tokenService: TokenService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    // @ts-ignore
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.tokenService.getToken()){
      if(JSON.stringify(this.tokenService.getRoles()) === JSON.stringify(["ADMIN"])){
        return true;
      }
      else{
        alert("Không có quyền của admin");
        this.router.navigate(['']);
      }
    }
    else{
      alert("Bạn chưa đăng nhập hoặc đăng kí");
      this.router.navigate(['login']);
    }

  }

}
