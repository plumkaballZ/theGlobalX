import { getAuthStatus } from './../../../../auth/reducers/selectors';
import { AppState } from './../../../../interfaces';
import { Store } from '@ngrx/store';
import { AuthActions } from './../../../../auth/actions/auth.actions';
import { AddressService } from './../../../../checkout/address/services/address.service';
import { CheckoutService } from './../../../../core/services/checkout.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit, OnDestroy {

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();



  addressForm: FormGroup;
  emailForm: FormGroup;
  isAuthenticated: boolean;

  constructor(
    private fb: FormBuilder, private authActions: AuthActions,
    private checkoutService: CheckoutService,
    private addrService: AddressService,
    private store: Store<AppState>) {
      
      this.addressForm = addrService.initAddressForm();
      this.emailForm = addrService.initEmailForm();
      
      this.store.select(getAuthStatus).subscribe((auth) => {
        this.isAuthenticated = auth;
      });   
  }

  ngOnInit() {
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
    
    this.addrService.createAddress(addressAttributes).subscribe(
      response => {
        this.notify.emit("1");
      }
    );
 
  }

  private getEmailFromUser() {
    return this.emailForm.value.email;
  }

  ngOnDestroy() {
  }

}
