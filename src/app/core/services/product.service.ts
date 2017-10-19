import { Observable } from 'rxjs/Observable';
import { HttpService } from './http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private http: HttpService) { }

  getProduct(id: string): Observable<any> {
    return this.http.get(`/assets/api/prods/helloKittyProd.json`)
    .map(res => res.json());
  }

  getTaxonomies(): any {
    return this.http.get(`/assets/api/prods/taxonomies.json`).map(res => res.json());
  }
  
  getProducts(): any {
    return this.http.get(`/assets/api/prods/prods.json`).map(res => res.json());
  }
}
