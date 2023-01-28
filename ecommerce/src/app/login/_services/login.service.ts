import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SignInForm} from "../_models/SignInForm";
import {Observable} from "rxjs";
import {JwtResponse} from "../_models/JwtResponse";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_LOGIN = environment.API_LOCAL +'/auth/signin';
  constructor( private http: HttpClient) { }

  public signIn(signInForm: SignInForm): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.API_LOGIN,signInForm);
  }
}
