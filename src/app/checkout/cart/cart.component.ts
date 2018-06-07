import { Router } from '@angular/router';
import { getTotalCartValue, getOrderState, getTotalCartItems, getLineIds } from './../reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { CheckoutService } from './../../core/services/checkout.service';
import { CheckoutActions } from './../actions/checkout.actions';
import { AppState } from './../../interfaces';
import { Store } from '@ngrx/store';
import { LineItem } from './../../core/models/line_item';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from './../../core/services/product.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;
  pageTrans: any;

  constructor(private store: Store<AppState>, private translate: TranslateService, private prodService: ProductService) {
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
  }
  
  ngOnInit() { 
    this.translate.get('cart').subscribe((res: any) => {
      this.pageTrans = res;
    });
  }
}
