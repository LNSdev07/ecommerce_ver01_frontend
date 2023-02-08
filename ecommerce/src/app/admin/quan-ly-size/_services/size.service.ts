import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageSizeRequestModel} from "../_models/pagesizerequest.model";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {SizeModel} from "../_models/size.model";

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  public findSize(pageRequest: PageSizeRequestModel): Observable<any>{
    let API_SIZE = environment.API_LOCAL +'/sizes'
    return this.http.post(API_SIZE, pageRequest);
  }

  public addSize(sizeModel: SizeModel):Observable<any>{
    let API_ADD_SIZE = environment.API_LOCAL +'/size';
    return this.http.post(API_ADD_SIZE, sizeModel);
  }

  public deleteBySizeId(id: number):Observable<any>{
    let API_DELETE_SIZE = environment.API_LOCAL + '/size?id='+id;
    return this.http.delete(API_DELETE_SIZE);
  }

  public getSizeById(id: number):Observable<any>{
    let API_GET_SIZE = environment.API_LOCAL + '/size?id='+id;
    return this.http.get(API_GET_SIZE);
  }
}
