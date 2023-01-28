import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ProfileModel} from "../_models/profile.model";
import {SignUpForm} from "../../signup/_models/SignUpForm";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private API_PROFILE_USER = environment.API_LOCAL+'/profile/user';

  private API_PROFILE = environment.API_LOCAL +'/profile';

  constructor(private http: HttpClient) { }


  public getInforUse(): Observable<ProfileModel>{
    return this.http.get<ProfileModel>(this.API_PROFILE_USER);
  }

  public changeInfoUser(signUp: SignUpForm): Observable<any>{
    return this.http.post(this.API_PROFILE, signUp);
  }
}
