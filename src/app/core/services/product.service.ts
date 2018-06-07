import { Observable } from 'rxjs/Observable';
import { HttpService } from './http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  public langZ : any;
  private _useEuroPrice: boolean;

  constructor(private http: HttpService) { 

    var langZ = localStorage.getItem('localFlag');

    if(langZ) {
      if(langZ == 'gb') {
        this._useEuroPrice = true;
      }
    }
  }
  
  getProduct(id: string): Observable<any> {
    return this.http.get('/assets/api/_prod/' + id.toString() +'.json')
    .map(res =>
      {
        var prod = res.json();

        if(this._useEuroPrice) {
          prod.price = prod.price_GB;
          prod.display_price = prod.price_GB + ' €';
        }

        return prod;
      });
  }
  getTaxonomies(): any {
    return this.http.get(`/assets/api/_prod/taxonomies.json`).map(res => res.json());
  }
  getProducts(): any {
    return this.http.get(`/assets/api/_prod/prodList.json`).map(
      res => {   
        var podList = res.json();

        podList.products.forEach(prod => {
          if(this._useEuroPrice) {
            prod.price = prod.price_GB;
            prod.display_price = prod.price_GB + ' €';
          }

        });

        return podList;
      });
  }
}