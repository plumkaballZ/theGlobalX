import { Address } from './../../../core/models/address';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from './../../../interfaces';
import { CheckoutActions } from './../../../checkout/actions/checkout.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.scss']
})

export class DeliveryAddressComponent implements OnInit {
  pageTrans: any;

  @Input() selectedAddress: Address;
  @Input() addrs: Address[];
  @Input() delOptions: any[]; 
  @Input() selectedDel : any;

  private _store: Store<AppState>;
  private _actions: CheckoutActions;

  constructor(store: Store<AppState>, actions: CheckoutActions, private translate: TranslateService) {  
    this._store = store;
    this._actions = actions;

    this.delOptions = [{
      "prop1":"GLS PakkeShop afhentning",
      "prop2":"40 DKK"
    }, {
      "prop1":"GLS Pakkelevering ", 
      "prop2":"50 DKK"
  }];

  this.selectedDel = this.delOptions[0];
  }

  ngOnInit() {
    this.translate.get('deliveryAddress').subscribe((res: any) => {
      this.pageTrans = res;
    });
  }

  public selectAddr(event, item : Address) {
    this.selectedAddress = item;
    const order = JSON.parse(localStorage.getItem('order'));
    order.ship_address = item;
    this._store.dispatch(this._actions.updateOrderSuccess(order));
  }

  public selectDelOption(event, item : any) {
    this.selectedDel = item;
  }

}
