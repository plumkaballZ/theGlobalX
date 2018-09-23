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

import { ProductService } from './../../core/services/product.service';

class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}

@Injectable()
export class CheckoutService {
  private orderNumber: number;
  public currentOrder: Order;

  constructor(
    private http: HttpService,
    private actions: CheckoutActions,
    private store: Store<AppState>,
    private prodService: ProductService,
  ) {
      this.store.select(getOrderNumber)
        .subscribe(number => this.orderNumber = number);
    }

  createNewLineItem(prod: Product) {  

    return this.http.get(`/assets/api/orders/dummyLine.json`).map(res => {
      var lineItem: any = res.json();
    
      lineItem.prod = prod;
      lineItem.id = prod.id;
      lineItem.display_amount = lineItem.display_amount
      lineItem.total = parseInt(prod.price);
      lineItem.price  = prod.price;
      lineItem.color = prod.color;
      lineItem.size = prod.size;
      lineItem.quantity = prod.total_on_hand;

      return lineItem;
    });
  }

  fetchCurrentOrder() {
   
    var localUser = JSON.parse(localStorage.getItem('user'));
   
    var _email = localStorage.getItem('userUid');

    if(_email == null) {
      _email = Guid.newGuid();
      localStorage.setItem('userUid', _email);
    }

    if(localUser != null)
    {
      if(localUser.email != null) {
        _email = localUser.email;
      }
    }
  
    return this.http.get_Web(
      'api/xOrder', { params:{ email:_email } }
    ).map(res => {

      var order = res.json();
      const currOrder: Order = res.json();
      this.currentOrder = currOrder;


      var total = 0;	
      var index = 1;

      if(currOrder.line_items)	      
      {
        var fin = currOrder.line_items.length;
        currOrder.line_items.forEach(lineItem => {
          this.prodService.getProduct(lineItem.id.toString()).subscribe(response => {
            total += parseFloat(response.price) * lineItem.quantity;
            if(fin == index)	
            {	
               const token = order;        	
               this.setOrderTokenInLocalStorage({order_token: token});	
               return this.store.dispatch(this.actions.fetchCurrentOrderSuccess(order, total));	
            }
            index++;
          });
        });
      }

      if(order.nope){
        this.createEmptyOrder().subscribe();        
      }

      // if(currOrder.line_items)
      // {
      //   const token = order;        
      //   this.setOrderTokenInLocalStorage({order_token: token});
      //   return this.store.dispatch(this.actions.fetchCurrentOrderSuccess(order, parseFloat(this.currentOrder.total)));
      // }
      // if(order.nope){
      //   this.createEmptyOrder().subscribe();        
      // }

    });
  }

  createEmptyOrder() {  
    const user = JSON.parse(localStorage.getItem('user'));
    
    
    var ip = localStorage.getItem('userUid');

    var data ={
      email : (user != null ? user.email : ''),
      mobile: '',
      password : (user != null ? user.password : ''),
      password_confirmation : '',
      ip : ip
    }


    return this.http.post_Web(
      'api/xOrder', JSON.stringify({ "glxUser": data })
    ).map((res: Response) => {
       
      const currOrder: Order = res.json();
      this.currentOrder = currOrder;

      const order = res.json();
      const token = order;

      this.setOrderTokenInLocalStorage({order_token: token});
      return this.store.dispatch(this.actions.fetchCurrentOrderSuccess(order, 0));
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

    var lineId = lineItem.id;

    
    this.currentOrder.line_items.forEach(element => {

      if(element.id == lineId) {
        
        element.delStr = "true";
        element.id = lineId;
      }

      if(element.variant_id == lineId) {
        element.delStr = "true";
        element.id = lineId;
      }

    });

    this.currentOrder.special_instructions = 'deleteLineItem';

    var tmpLineItem = new LineItem();

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

  addLineItem(lineItem: any) {

    console.log('addLineItem');

    const user = JSON.parse(localStorage.getItem('user'));

    var data ={
      email : (user != null ? user.email : ''),
      mobile: '',
      password : (user != null ? user.password : ''),
      password_confirmation : ''
    }


    if(this.currentOrder.line_items == null) {
      this.currentOrder.line_items = [];
    }   

    this.currentOrder.line_items.push(lineItem);
    this.currentOrder.special_instructions = 'addLineItem';
    
    return this.http.post_Web('api/xOrder/UpdateOrder', JSON.stringify(
      {
        "Order" : this.currentOrder, 
        "glxUser" : data, 
        "bill_address_attributes": null, 
        "ship_address_attributes": null
    }))
      .map((res: Response) =>  {
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
    }

    return this.http.post_Web('api/xOrder/UpdateOrder', 
    JSON.stringify(
      {
        "Order" : (params != "" ? params : this.currentOrder), 
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


