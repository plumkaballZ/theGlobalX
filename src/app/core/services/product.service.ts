import { Observable } from 'rxjs/Observable';
import { HttpService } from './http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private http: HttpService) { }
  
  getProduct(id: string): Observable<any> {
    return this.http.get('/assets/api/_prod/' + id.toString() +'.json')
    .map(res => res.json());
  }
  getTaxonomies(): any {
    return this.http.get(`/assets/api/_prod/taxonomies.json`).map(res => res.json());
  }
  getProducts(): any {
    return this.http.get(`/assets/api/_prod/prodList.json`).map(res => res.json());
  }
}