import { LineItem } from './../../core/models/line_item';
import { environment } from './../../../environments/environment';
import { CheckoutActions } from './../actions/checkout.actions';
import { Store } from '@ngrx/store';
import { AppState } from './../../interfaces';
import { Order } from './../../core/models/order';
import { UserService } from './../../user/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CheckoutService } from './../../core/services/checkout.service';
import { getAuthStatus } from './../../auth/reducers/selectors';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  queryParams: any;
  orderDetails: Order
  isAuthenticated: boolean;
  tranz : any;

  constructor(
    private userService: UserService,
    private activatedRouter: ActivatedRoute,
    private route: Router,
    private store: Store<AppState>,
    private actions: CheckoutActions,
    private checkoutService : CheckoutService,
    private translate: TranslateService
  ) {    

    this.store.select(getAuthStatus).subscribe((auth) => {
      this.isAuthenticated = auth;
    });

    if(this.checkoutService.currentOrder == null) {
      this.route.navigate(['/']);
    }
    if(this.checkoutService.currentOrder.payment_state != '0') {
      this.route.navigate(['/']);
    }
    if(this.checkoutService.currentOrder.payment_state == '0'){
      this.orderDetails = this.checkoutService.currentOrder;
      // this.checkoutService.createEmptyOrder().subscribe();
    }
  }
  ngOnInit() {
    this.translate.get('orderSucc').subscribe((res: any) => {
      this.tranz = res;
    });
  }
}