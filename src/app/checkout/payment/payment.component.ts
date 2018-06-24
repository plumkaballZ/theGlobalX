import { Address } from './../../core/models/address';
import { CheckoutService } from './../../core/services/checkout.service';
import { CheckoutActions } from './../actions/checkout.actions';
import { getTotalCartValue, getOrderNumber, getTotalCartItems, getShipAddress, del_getTotalCartValue } from './../reducers/selectors';
import { AppState } from './../../interfaces';
import { Router, ChildrenOutletContexts } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  totalCartValue$: Observable<number>;

  del_totalCartValue$: Observable<number>;

  totalCartItems$: Observable<number>;
  address$: Observable<Address>;
  orderNumber$: Observable<number>;
  pageTrans: any;
  shipTotal : any;
  
  constructor(private store: Store<AppState>, private router: Router, private translate: TranslateService, private checkoutService: CheckoutService) {
    
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
    
    this.address$ = this.store.select(getShipAddress);
    this.orderNumber$ = this.store.select(getOrderNumber);

    if(this.checkoutService.currentOrder != null)
    this.shipTotal = this.checkoutService.currentOrder.ship_total;
    
    this.store.select(getTotalCartItems).subscribe((tot) => {
      
      if(tot == 0) this.router.navigate(['/checkout', 'cart']);
      else {
        this.store.select(getShipAddress).subscribe((addr) => {
          if(!addr)  this.router.navigate(['/checkout', 'address']);
        });
      }
      
    });
  }

  ngOnInit() {
    this.translate.get('payment').subscribe((res: any) => {
      this.pageTrans = res;
    });
  }

}
