import { Router } from '@angular/router';
import { getTotalCartValue, getOrderState, getTotalCartItems } from './../reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { CheckoutService } from './../../core/services/checkout.service';
import { CheckoutActions } from './../actions/checkout.actions';
import { AppState } from './../../interfaces';
import { Store } from '@ngrx/store';
import { LineItem } from './../../core/models/line_item';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;

  constructor(private store: Store<AppState>, private translate: TranslateService) {
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
  
    console.log(this.totalCartItems$);
    console.log(this.totalCartValue$);
  }
  
  ngOnInit() {
  }

}
