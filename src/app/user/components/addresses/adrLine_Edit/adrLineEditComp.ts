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

import { AddressService } from './../../../../checkout/address/services/address.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'adrLineEditComp',
  templateUrl: './adrLineEdit.html',
  styleUrls: ['./adrLineEdit.scss']
})

export class AdrLineEditComp implements OnInit, OnDestroy {

  routeSubscription$: Subscription;
  orderSubscription$: Subscription;
  adrId: String;
  adr: Address;

  addressForm: FormGroup;
  emailForm: FormGroup;

  _addressService : AddressService;

  constructor(
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
            this.addressForm = this._addressService.initAddressFrom_EDIT(response);
          }
        
        );
      }
    );
  }

  onSubmit() {
    
    const address = this.addressForm.value;
    let addressAttributes;

    // if (this.isAuthenticated) {
    //   addressAttributes = this.addrService.createAddresAttributes(address);
    // } else {
    //   const email = this.getEmailFromUser();
    //   addressAttributes = this.addrService.createGuestAddressAttributes(address, email);
    // }
    
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
