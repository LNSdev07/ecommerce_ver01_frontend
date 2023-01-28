import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SignUpForm } from '../_models/SignUpForm';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private API_SIGNUP = environment.API_LOCAL +'/auth/signup';

  constructor(private http: HttpClient) { }

  public signUp(signUp : SignUpForm): Observable<any>{
    return this.http.post<any>(this.API_SIGNUP, signUp);
  }
}
