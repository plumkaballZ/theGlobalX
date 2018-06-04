import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from './../../../../interfaces';
import { getTotalCartValue, getTotalCartItems } from './../../../../checkout/reducers/selectors';
import { CheckoutService } from './../../../../core/services/checkout.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cash-on-delivery',
  templateUrl: './cash-on-delivery.component.html',
  styleUrls: ['./cash-on-delivery.component.scss']
})
export class CashOnDeliveryComponent implements OnInit {
  
  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;

  @Output() payOnDelivery: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private checkoutService: CheckoutService, private store: Store<AppState>) {
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
   }

  ngOnInit() {
  }
  
  onPay() {
    this.payOnDelivery.emit(true);
  }
}
