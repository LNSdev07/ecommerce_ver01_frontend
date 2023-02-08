import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ColorRequestModel} from "../_models/colorRequest.model";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {ColorModel} from "../_models/color.model";

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private http: HttpClient) { }

  public findColor(colorReq: ColorRequestModel):Observable<any>{
    let API_FIND = environment.API_LOCAL +'/colors';
    return this.http.post(API_FIND, colorReq);
  }

  public addColor(colorModel: ColorModel):Observable<any>{
    let API_POST = environment.API_LOCAL +'/color';
    return this.http.post(API_POST, colorModel);
  }

  public deleteById(id: number):Observable<any>{
    let API_DELETE = environment.API_LOCAL+'/color?id='+id;
    return this.http.delete(API_DELETE);
  }

  public getById(id: number):Observable<any>{
    let API_GET = environment.API_LOCAL+'/color?id='+id;
    return this.http.get(API_GET);
  }
}
