import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PageProductModel} from "../_models/pageproduct.model";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public findProduct(pageProduct: PageProductModel) :Observable<any>{
    const  API_PRODUCTS = environment.API_LOCAL+'/products';
    return this.http.post(API_PRODUCTS, pageProduct);
  }
}
