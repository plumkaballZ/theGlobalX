import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../interfaces';
import { UserActions } from '../../../actions/user.actions';
import { UserService } from '../../../services/user.service';
import { Address } from '../../../../core/models/address';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';

import { AuthActions } from './../../../../auth/actions/auth.actions';
import { AddressService } from './../../../../checkout/address/services/address.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'isAuthenticated',
  templateUrl: './adrLineEdit.html',
  styleUrls: ['./adrLineEdit.scss']
})

export class AdrLineEditComp implements OnInit, OnDestroy {

  routeSubscription$: Subscription;
  orderSubscription$: Subscription;
  adrId: String;
  adr: Address;
  adrUid: string;

  isAuthenticated: boolean;

  addressForm: FormGroup;
  emailForm: FormGroup;

  _addressService : AddressService;

  constructor(
    private fb: FormBuilder, private authActions: AuthActions,
    private userService: UserService,
    private route: ActivatedRoute,
    private addrService: AddressService
  ) {
    this._addressService = addrService;
    this.addressForm = addrService.initAddressForm();
    this.emailForm = addrService.initEmailForm();
  }

  ngOnInit() {
    this.routeSubscription$ = this.route.params.subscribe(
      (params: any) => 
      {
        this.adrId = params['id'];
        this.orderSubscription$ =
        this.userService.getAddr(this.adrId).subscribe(
          response => {
            
            this.adr = response;
            this.adrUid = response.uid;
            
            this.addressForm.patchValue({
              firstname: this.adr.firstname, 
              lastname: this.adr.lastname,
              city: this.adr.city,
              phone:  this.adr.phone,
              zipcode:  this.adr.zipcode
            });

            const user = JSON.parse(localStorage.getItem('user'));

            this.emailForm.patchValue({
              email: user.email
            })
          }
        
        );
      }
    );
  }

  onSubmit() {
    const address = this.addressForm.value;

    let addressAttributes;
    addressAttributes = this.addrService.createAddresAttributes(address);

    addressAttributes.order.bill_address_attributes.uid = this.adrUid;
    addressAttributes.order.ship_address_attributes.uid = this.adrUid;

     this.addrService.createAddress(addressAttributes).subscribe(
       response => {
       }
     );
  }

  ngOnDestroy() {
    this.routeSubscription$.unsubscribe();
    this.orderSubscription$.unsubscribe();
  }

}
