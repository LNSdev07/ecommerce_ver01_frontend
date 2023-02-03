import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoryModel} from "../_models/category.model";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {pageRequestModel} from "../_models/pageRequest.model";
import {UserModel} from "../../quan-ly-khach-hang/_models/User.model";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_CATEGORY = environment.API_LOCAL +'/categories'
  constructor(private http: HttpClient) { }



  public findCategory(resq: pageRequestModel): Observable<any>{
    // http://localhost:8080/api/status/user
    let API_CATEGORY = environment.API_LOCAL +'/categories'
    return this.http.post(API_CATEGORY, resq);
  }

  public addCategory(res : CategoryModel): Observable<any>{
    let API_ADD_CATEGORY = environment.API_LOCAL +'/category';
    return  this.http.post(API_ADD_CATEGORY, res);
  }


  public getCategoryById(id: number): Observable<any>{
    let API_GET_CATEGORY = environment.API_LOCAL+'/category?id='+id;
    return this.http.get(API_GET_CATEGORY);
  }

  public deteteById(id: number): Observable<any>{
    let API_GET_CATEGORY = environment.API_LOCAL+'/category?id='+id;
    return this.http.delete(API_GET_CATEGORY);
  }

}
