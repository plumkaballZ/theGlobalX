import { getOrderNumber } from './../../checkout/reducers/selectors';
import { CheckoutActions } from './../../checkout/actions/checkout.actions';
import { Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LineItem } from './../models/line_item';
import { AppState } from './../../interfaces';
import { Store } from '@ngrx/store';
import {Order} from './../../core/models/order';
import {Address} from './../../core/models/address';
import { Product } from './../../core/models/product';
import { HttpService } from './http';

@Injectable()
export class PakkeLabelsService {
  constructor(private http: HttpService) {
      
  }

  getCurrentIpLocation(): Observable<any> {
    return this.http.get_full('https://ipinfo.io')
    .map(response => response.json())
    .catch(error => {
      console.log(error);
      return Observable.throw(error.json());
    });
}

  login() { 

    if(this.doLogin()){

      return this.http.get_Web('api/xPakkelabels', {params:{ token : "n" }}).map(res => {
        var token = res.json();
        localStorage.setItem('pakToken', JSON.stringify(token));
      });
    }

    return this.http.get_Web('api/xPakkelabels', {params:{ token : "o" }}).map(res => {
    });
  }
  
  GetFreightRates(country: string) {

    var pakToken:any = JSON.parse(localStorage.getItem('pakToken'));

    return this.http.get_Web('api/xPakkelabels/GetFreightRates', {params: {token: 'token', country: country}})
      .map((res: Response) =>  {
        return res.json();
      });

  }
    doLogin() {
      var pakToken:any = JSON.parse(localStorage.getItem('pakToken'));

      console.log(pakToken);
      
      if(pakToken == null) {
        return true;
      }
      
      var tokenTime = (Date.parse(pakToken.expires_at));

      if(tokenTime < Date.now()){
        return true;
      }
      else {
        return false;
      }
    }
}