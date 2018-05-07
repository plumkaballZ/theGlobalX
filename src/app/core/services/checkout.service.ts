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
export class CheckoutService {
  private orderNumber: number;
  public currentOrder: any;

  constructor(
    private http: HttpService,
    private actions: CheckoutActions,
    private store: Store<AppState>,
  ) {
      this.store.select(getOrderNumber)
        .subscribe(number => this.orderNumber = number);
    }

  createNewLineItem(prod: Product) {  
    return this.http.get(`/assets/api/orders/dummyLine.json`).map(res => {
      const lineItem: LineItem = res.json();
      lineItem.prod = prod;
      return lineItem;
    });
  }

  fetchCurrentOrder() {
    var localUser = JSON.parse(localStorage.getItem('user'));
    return this.http.get_Web(
      'api/xOrder', { params:{email:(localUser== null ? '': localUser.email)} }
    ).map(res => {
      
      const order = res.json();
      const currOrder: Order = res.json();
      this.currentOrder = currOrder;

    
      if(order.nope){
        this.createEmptyOrder().subscribe();
      }
      else{
        const token = order;        
        this.setOrderTokenInLocalStorage({order_token: token});
        return this.store.dispatch(this.actions.fetchCurrentOrderSuccess(order));
      }
    });
  }

  createEmptyOrder() {  
    const user = JSON.parse(localStorage.getItem('user'));
    
    var data ={
      email : (user != null ? user.email : ''),
      mobile: '',
      password : (user != null ? user.password : ''),
      password_confirmation : ''
    }

    return this.http.post_Web(
      'api/xOrder', JSON.stringify({ "glxUser": data })
    ).map((res: Response) => {

      const order = res.json();
      const token = order;

      this.setOrderTokenInLocalStorage({order_token: token});
      return this.store.dispatch(this.actions.fetchCurrentOrderSuccess(order));
    });
  }
  
  getOrder(orderNumber) {
    return this.http.get(
      `spree/api/v1/orders/${orderNumber}.json`
    ).map(res => {
      const order = res.json();
      return order;
    });
  }
  deleteLineItem(lineItem: LineItem) {

    const user = JSON.parse(localStorage.getItem('user'));

    var data ={
      email : (user != null ? user.email : ''),
      mobile: '',
      password : (user != null ? user.password : ''),
      password_confirmation : ''
    }

    return this.http.post_Web('api/xOrder/UpdateOrder', JSON.stringify(
      {
        "Order" : this.currentOrder, 
        "glxUser" : data, 
        "bill_address_attributes": null, 
        "ship_address_attributes": null
    }))
      .map((res: Response) =>  {
        this.store.dispatch(this.actions.removeLineItemSuccess(lineItem));
      });
  }

  changeOrderState() {
    return this.http.put(
      `spree/api/v1/checkouts/${this.orderNumber}/next.json?order_token=${this.getOrderToken()}`,
      {}
    ).map((res) => {
      const order = res.json();
      this.store.dispatch(this.actions.changeOrderStateSuccess(order));
    });
  }
  getTxt(){
    return this.http.get_Web(`api/xTxt`).map((res) => {
      var txtRes = res.json();
      return txtRes;
    });
  }
  postTxt(){
  }
  updateOrder(params) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    var data ={
      email : (user != null ? user.email : ''),
      mobile: '',
      password : (user != null ? user.password : ''),
      password_confirmation : ''
    }

    if(this.currentOrder.line_items.length == 0){
      this.currentOrder.line_items.push(new LineItem().CardHolderX());
    }

    return this.http.post_Web('api/xOrder/UpdateOrder', JSON.stringify(
      {
        "Order" : this.currentOrder, 
        "glxUser" : data, 
        "bill_address_attributes": (params != null ? params : null), 
        "ship_address_attributes": (params != null ? params : null)
    }))
      .map((res: Response) =>  {
        const order = res.json();
        return this.store.dispatch(this.actions.updateOrderSuccess(order));
      });
  }

  availablePaymentMethods() {
    return this.http.get_Web(
      `api/xPaymentMode`
    ).map((res) => {
      const payments = res.json();
      return payments;
    });
  }

  createNewPayment(paymentModeId, paymentAmount) {
    return this.http.post(
      `spree/api/v1/orders/${this.orderNumber}/payments?order_token=${this.getOrderToken()}`,
      {
        payment: {
          payment_method_id: paymentModeId,
          amount: paymentAmount
        }
      }
    ).map((res) => {
      this.changeOrderState()
        .subscribe();
    });
  }
  private getOrderToken() {
    const order = JSON.parse(localStorage.getItem('order'));
    const token = order.order_token;
    return token;
  }
  private setOrderTokenInLocalStorage(token): void {
    const jsonData = JSON.stringify(token);
    localStorage.setItem('order', jsonData);
  }
}
