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
import { empty } from 'rxjs/Observer';

import { CheckoutActions } from './../../checkout/actions/checkout.actions';

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
  addrs$: Observable<any[]>;

  showAdrs$ : boolean;
  strMail: string;

  isAuthenticated: boolean;

  breadcrumbs$: string[] = ['OrderOverview', 'OderDetails'];
  homeLink$: string = '/checkout/address';

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private checkoutActions: CheckoutActions,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.showAdrs$ = true;

      this.orderNumber$ = this.store.select(getOrderNumber);
      this.shipAddress$ = this.store.select(getShipAddress);

      this.stateSub$ = this.store.select(getOrderState).subscribe(state => this.orderState = state);

        this.actionsSubscription = this.route.params.subscribe(
          (params: any) => {
            this.userService.getAddrs(

              JSON.parse(localStorage.getItem('user')) == null ? localStorage.getItem('userUid') : JSON.parse(localStorage.getItem('user')).email).subscribe(
                response => {
                  if(response.length > 0) {
                    this.showAdrs$ = true;
                    this.isAuthenticated = true;
                  }
                  else {
                    this.showAdrs$ = false;
                    this.isAuthenticated = false;
                  }

                  this.addrs$ = response
                } 
              );
          }
        );
  }

  ngOnInit() {
  }

  checkoutToPayment() {
    if (this.orderState === 'delivery' || this.orderState === 'address') {
      this.checkoutService.changeOrderState()
        .do(() => { 
          this.router.navigate(['/checkout', 'payment']);
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
  c01_onSubmit(message:any){
    
    this.strMail= JSON.parse(localStorage.getItem('user')) == null ? message : JSON.parse(localStorage.getItem('user')).email
    this.strMail = this.strMail == null ? message : this.strMail;
    this.showAdrs$ = true;
 

    if(this.isAuthenticated) {
      
      this.actionsSubscription = this.route.params.subscribe(
        (params: any) => {
          this.userService.getAddrs(this.strMail).subscribe(
              response => {
                if(response.length > 0) this.showAdrs$ = true;
                else this.showAdrs$ = false;
                this.addrs$ = response
              } 
            );
        }
      );
    }
    else {
      this.addrs$ = message;
    }

    
  }
  AddNewAddr(){
    this.showAdrs$ = false;
  }
}
