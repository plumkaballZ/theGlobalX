import { Address } from './../../../core/models/address';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from './../../../interfaces';
import { CheckoutActions } from './../../../checkout/actions/checkout.actions';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})
export class DeliveryAddressComponent implements OnInit {

  @Input() selectedAddress: Address;

  @Input() addrs: Address[];

  private _store: Store<AppState>;
  private _actions: CheckoutActions;

  constructor(store: Store<AppState>, actions: CheckoutActions) {  
    this._store = store;
    this._actions = actions;

  }

  ngOnInit() {
  }

  public selectAddr(event, item : Address) {
    this.selectedAddress = item;
    const order = JSON.parse(localStorage.getItem('order'));
    order.ship_address = item;
    this._store.dispatch(this._actions.updateOrderSuccess(order));
  }

}
