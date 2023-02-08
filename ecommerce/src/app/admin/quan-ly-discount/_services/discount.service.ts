import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {DiscountRequestModel} from "../_models/discountRequest.model";
import {DiscountModel} from "../_models/discount.model";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  public findDiscount(discountReq: DiscountRequestModel):Observable<any>{
    let API_FIND = environment.API_LOCAL +'/discounts';
    return this.http.post(API_FIND, discountReq);
  }

  public addDiscount(discountModel: DiscountModel):Observable<any>{
    let API_POST = environment.API_LOCAL +'/discount';
    return this.http.post(API_POST, discountModel);
  }

  public deleteById(id: number):Observable<any>{
    let API_DELETE = environment.API_LOCAL+'/discount?id='+id;
    return this.http.delete(API_DELETE);
  }

  public getById(id: number):Observable<any>{
    let API_GET = environment.API_LOCAL+'/discount?id='+id;
    return this.http.get(API_GET);
  }
}
