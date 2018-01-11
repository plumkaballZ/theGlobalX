import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CheckoutService } from './../../core/services/checkout.service';
import { getShipAddress, getOrderState, getOrderNumber } from './../reducers/selectors';
import { AppState } from './../../interfaces';
import { Store } from '@ngrx/store';
import { Address } from './../../core/models/address';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../user/services/user.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {

  stateSub$: Subscription;
  orderState: string;
  orderNumber$: Observable<number>;
  shipAddress$: Observable<Address>;
  
  actionsSubscription: Subscription;
  addrs$: Observable<Address[]>;

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {

      this.orderNumber$ = this.store.select(getOrderNumber);
      this.shipAddress$ = this.store.select(getShipAddress);
      
      this.stateSub$ = this.store.select(getOrderState).subscribe(state => this.orderState = state);

        this.actionsSubscription = this.route.params.subscribe(
          (params: any) => {
            this.userService.getAddrs(
              JSON.parse(localStorage.getItem('user')) == null ? "" : JSON.parse(localStorage.getItem('user')).email).subscribe(response => this.addrs$ = response);
          }
        );
  }

  ngOnInit() {
  }



  checkoutToPayment() {
    if (this.orderState === 'delivery' || this.orderState === 'address') {
      this.checkoutService.changeOrderState()
        .do(() => { this.router.navigate(['/checkout', 'payment']);
        })
        .subscribe();
    } else {
      this.router.navigate(['/checkout', 'payment']);
    }
  }

  ngOnDestroy() {
    if (this.orderState === 'delivery') {
      this.checkoutService.changeOrderState()
        .subscribe();
    }
    this.stateSub$.unsubscribe();
  }

}
