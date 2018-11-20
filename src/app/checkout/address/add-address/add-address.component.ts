import { getAuthStatus } from './../../../auth/reducers/selectors';
import { AppState } from './../../../interfaces';
import { Store } from '@ngrx/store';
import { AuthActions } from './../../../auth/actions/auth.actions';
import { AddressService } from './../services/address.service';
import { CheckoutService } from './../../../core/services/checkout.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-add-address',
  templateUrl: './addAddress.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit, OnDestroy {

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  pageTrans: any;

  addressForm: FormGroup;
  emailForm: FormGroup;
  isAuthenticated: boolean;
  userEmail: string;

  constructor(
    private fb: FormBuilder, private authActions: AuthActions,
    private checkoutService: CheckoutService,
    private addrService: AddressService,
    private store: Store<AppState>,
    private translate: TranslateService) {
      
      this.addressForm = addrService.initAddressForm();
      this.emailForm = addrService.initEmailForm();
      
      this.store.select(getAuthStatus).subscribe((auth) => {
        this.isAuthenticated = auth;
      });   

     
  }

  ngOnInit() {
    this.translate.get('addAddress').subscribe((res: any) => {
      this.pageTrans = res;
    });
    this.userEmail = 'asdf';
  }
  
  onSubmit() {
    const address = this.addressForm.value;
    let addressAttributes;

    if (this.isAuthenticated) {
      addressAttributes = this.addrService.createAddresAttributes(address);
    } else {
      const email = this.getEmailFromUser();
      addressAttributes = this.addrService.createGuestAddressAttributes(address, email);
    }
    
    addressAttributes.order.ship_address_attributes.state_id = localStorage.getItem('userUid');

    this.addrService.createAddress(addressAttributes).subscribe(
      response => {
        var addr = response.bill_address;
        var arr = [];
        arr.push(addr);
        this.notify.emit(arr);
      }
    );
 
  }

  private getEmailFromUser() {
    return this.emailForm.value.email;
  }

  ngOnDestroy() {
  }

}
