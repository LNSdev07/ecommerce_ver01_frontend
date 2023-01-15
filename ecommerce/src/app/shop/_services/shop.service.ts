
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import { ShopModel } from '../_models/shop.model';
import { PageModel } from '../_models/page.model';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}
     const apiUrl = 'http://localhost:8080/api/product/';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient:HttpClient) { }

  getAll(id: number):Observable<any>{
    let url= apiUrl + new String(id);
    return this.httpClient.get<any>(url, httpOptions);
  }


  getProduct(sorts: string, colors: string, sizes: string, page: number ):Observable<any>{
        const API_URL = `http://localhost:8080/api/products?`;
        let url = API_URL+'sorts='+sorts +'&colors='+colors+"&sizes="+sizes+'&page='+page;
        return this.httpClient.get<any>(url, httpOptions);
  }

}
