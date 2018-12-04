import { Address } from './../../../core/models/address';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from './../../../interfaces';
import { CheckoutActions } from './../../../checkout/actions/checkout.actions';
import { TranslateService } from '@ngx-translate/core';
import { AddressService } from './../services/address.service';

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

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Output() notify2: EventEmitter<any> = new EventEmitter<any>();

  private _store: Store<AppState>;
  private _actions: CheckoutActions;

  isRemoveButtonPressed: boolean;

  constructor(store: Store<AppState>, actions: CheckoutActions, 
    private translate: TranslateService, private addressService: AddressService) {  
    this._store = store;
    this._actions = actions;
  }

  ngOnInit() {
    this.translate.get('deliveryAddress').subscribe((res: any) => {
      this.pageTrans = res;
    });
  }

  public selectAddr(event, item : Address) {
    
    if(this.isRemoveButtonPressed) {
      this.isRemoveButtonPressed = false;
    }
    else {
      this.selectedAddress = item;
      const order = JSON.parse(localStorage.getItem('order'));
      order.ship_address = item;
      this._store.dispatch(this._actions.updateOrderSuccess(order));
      this.notify.emit(item);
      }
  }

  public removeAddr(event, item : Address){
    this.isRemoveButtonPressed = true;

    console.log(item);

    this.addressService.deleteAddress(item).subscribe(
      response => {

        const index = this.addrs.indexOf(item, 0);
        
        if (index > -1) {
           this.addrs.splice(index, 1);
        }

        if(this.addrs.length == 0) {
          this.notify2.emit(item);
        }
      });

  }

  public selectDelOption(event, item : any) {
    this.notify.emit(item);
  }
}
