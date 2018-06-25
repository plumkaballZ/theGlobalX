import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from './../../../../interfaces';
import { getTotalCartValue, getTotalCartItems } from './../../../../checkout/reducers/selectors';
import { CheckoutService } from './../../../../core/services/checkout.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-cash-on-delivery',
  templateUrl: './cash-on-delivery.component.html',
  styleUrls: ['./cash-on-delivery.component.scss']
})
export class CashOnDeliveryComponent implements OnInit {
  
  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;
  shipTotal : number;

  tranz : any;

  @Output() payOnDelivery: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private checkoutService: CheckoutService, private store: Store<AppState>, private translate: TranslateService) {
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
    
    if(this.checkoutService.currentOrder != null){
      this.shipTotal = this.checkoutService.currentOrder.ship_total;
    }
   }

  ngOnInit() {
    this.translate.get('cashOnDel').subscribe((res: any) => {
      this.tranz = res;
    });
  }
  
  onPay() {
    this.payOnDelivery.emit(true);
  }
}
