import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {UserModel} from "../_models/User.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_GET_USERS = environment.API_LOCAL+'/users'

  private API_FIND_USERS = environment.API_LOCAL+'find/users';
  constructor(private http: HttpClient) { }

  public getListUser(): Observable<any>{
    return this.http.get(this.API_GET_USERS);
  }

  public findUser(textSearch: string): Observable<any>{
    let API_FIND_USERS = environment.API_LOCAL+'/find/user?textSearch='+textSearch;
    return this.http.get(API_FIND_USERS);
  }

  public findUserByUserName(username: string): Observable<any>{
    let API_FIND_USERS_BY_USERNAME = environment.API_LOCAL+`/find/users?username=`+username;
    return this.http.get(API_FIND_USERS_BY_USERNAME);
  }

  public changeStatus(userDTO: UserModel): Observable<any>{
    // http://localhost:8080/api/status/user
    let API_EDIT_STATUS = environment.API_LOCAL+'/status/user';
       return this.http.put(API_EDIT_STATUS, userDTO);
  }
}
