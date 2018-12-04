import { getAuthStatus } from './../../../auth/reducers/selectors';
import { AppState } from './../../../interfaces';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AuthActions } from './../../../auth/actions/auth.actions';
import { AddressService } from './../services/address.service';
import { CheckoutService } from './../../../core/services/checkout.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

//custom logics wrapper
import {AddressLogics} from './../address.Logics';

@Component({
  selector: 'app-add-address',
  templateUrl: './addAddress.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit, OnDestroy {
  private _addressLogics: AddressLogics

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  pageTrans: any;
  
  country_id: string;
  state_id: string;
  
  addressForm: FormGroup;
  emailForm: FormGroup;
  isAuthenticated: boolean;

  constructor(
    private fb: FormBuilder, private authActions: AuthActions,
    private checkoutService: CheckoutService,
    private addrService: AddressService,
    private store: Store<AppState>,
    private translate: TranslateService,
    private toastrService: ToastrService) {
      
    this._addressLogics = new AddressLogics();

      this.addressForm = addrService.initAddressForm();    
      this.store.select(getAuthStatus).subscribe((auth) => {
        this.isAuthenticated = auth;
      });        
  }

  ngOnInit() {
    this.translate.get('addAddress').subscribe((res: any) => {
      this.pageTrans = res;
    });
  }
  
  onSubmit() {
    const address = this.addressForm.value;

    if(!this._addressLogics.CheckIfAddressFormIsValid(address)) {
      this.toastrService.warning(this._addressLogics.GetAddressMissingInfo(), 'Info missing');
      return;
    }

    let addressAttributes;

     if (this.isAuthenticated) {
       addressAttributes = this.addrService.createAddresAttributes(address);
     } else {
       const email = this.getEmailFromUser();
       addressAttributes = this.addrService.createGuestAddressAttributes(address, email);
      }
    
     addressAttributes.order.ship_address_attributes.ip = localStorage.getItem('userUid');

     this.addrService.createAddress(addressAttributes).subscribe(
       response => {
         var addr = response.bill_address;
         var arr = [];
         arr.push(addr);
         this.notify.emit(arr);
       });
 
  }

  private getEmailFromUser() {
    return this.addressForm.value.email;
  }

  selectedCountry(countryId: string) {
    if(countryId == "US")
      this.addressForm.get('state_id').enable();
  }

  selectedState(stateId) {
  }

  ngOnDestroy() {
  }

}
