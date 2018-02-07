import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './../../../core/services/http';
import { CheckoutActions } from './../../../checkout/actions/checkout.actions';
import { AppState } from './../../../interfaces';
import { Address } from '../../../core/models/address';
import { Store } from '@ngrx/store';

@Injectable()
export class AddressService {
  constructor(
    private http: HttpService, 
    private actions: CheckoutActions,
    private store: Store<AppState>,
    private fb: FormBuilder) {}

  initAddressForm() {
    return this.fb.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'address1': ['', Validators.required],
      'address2': ['', Validators.required],
      'city': ['', Validators.required],
      'phone': ['', Validators.required],
      'zipcode': [10001, Validators.required],
      'state_id': [3561, Validators.required],
      'country_id': [232, Validators.required]
    });
  }
  initEmailForm() {
    return this.fb.group({
      'email': ['', Validators.required]
    });
  }

  createAddresAttributes(address) {
    return {
      'order': {
        'bill_address_attributes': address,
        'ship_address_attributes': address
      }
    };
  }

  createGuestAddressAttributes(address, email) {
    return {
      'order': {
        'email': email,
        'bill_address_attributes': address,
        'ship_address_attributes': address
      }
    };
  }

  createAddress(params) {
    const user = JSON.parse(localStorage.getItem('user'));

    var data ={
      email : (user != null ? user.email : ''),
      mobile: '',
      password : (user != null ? user.password : ''),
      password_confirmation : ''
    }

    return this.http.post_Web('api/xAddress', JSON.stringify
    ({
      "order" : params.order,
      "glxUser" : data,
      "bill_address_attributes": params.order.bill_address_attributes,
      "ship_address_attributes": params.order.ship_address_attributes
    }))
      .map((res: Response) =>  {
        const order = res.json();
        this.store.dispatch(this.actions.fetchCurrentOrderSuccess(order));
      });

    // return this.http.post_Web(
    //   `api/xOrder/updateOrder`,
    //   params
    // ).map((res) => {
    //   const order = res.json();
    //   this.store.dispatch(this.actions.updateOrderSuccess(order));
    // });
  }


}
