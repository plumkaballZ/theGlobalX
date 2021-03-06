import { getAuthStatus } from './../../../auth/reducers/selectors';
import { getTotalCartValue, getOrderNumber, getTotalCartItems, getShipAddress } from './../../reducers/selectors';
import { CheckoutActions } from './../../actions/checkout.actions';
import { AppState } from './../../../interfaces';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PaymentMode } from './../../../core/models/payment_mode';
import { PaymentService } from './../services/payment.service';
import { CheckoutService } from './../../../core/services/checkout.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-modes-list',
  templateUrl: './payment-modes-list.component.html',
  styleUrls: ['./payment-modes-list.component.scss']
})
export class PaymentModesListComponent implements OnInit {

  @Input() paymentAmount: number;
  @Input() orderNumber: number;
  paymentModes: PaymentMode[];
  selectedMode: PaymentMode = new PaymentMode;
  isAuthenticated: boolean;

  constructor(private checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private router: Router,
    private store: Store<AppState>,
    private checkoutActions: CheckoutActions) {
      this.store.select(getAuthStatus).subscribe((auth) => {
        this.isAuthenticated = auth;
      });
  }
  ngOnInit() {
    this.fetchAllPayments();
  }
  selectedPaymentMode(mode) {
    this.selectedMode = mode;
  }
  private fetchAllPayments() {
    this.checkoutService.availablePaymentMethods()
      .subscribe((payment) => {
        
        this.paymentModes = payment.payment_methods;
        this.selectedMode = this.paymentService.setCODAsSelectedMode(this.paymentModes);
      });
  }
  makePayment() {    
    var tmpAddr;
    
    this.store.select(getShipAddress).subscribe((addr) => {
      tmpAddr = addr;
    });
    
    this.checkoutService.currentOrder.payment_state = '0';
    this.checkoutService.currentOrder.ship_address = tmpAddr;
    this.checkoutService.currentOrder.special_instructions = 'updatePayment';
    this.store.dispatch(this.checkoutActions.updateOrder(""));
    
    this.router.navigate(['checkout', 'order-success']);
  }
}