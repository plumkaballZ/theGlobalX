import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CheckoutService } from './../../core/services/checkout.service';
import { getShipAddress, getOrderState, getOrderNumber } from './../reducers/selectors';
import { AppState } from './../../interfaces';
import { Store } from '@ngrx/store';
import { Address } from './../../core/models/address';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ViewChildren  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../user/services/user.service'
import { empty } from 'rxjs/Observer';
import { CheckoutActions } from './../../checkout/actions/checkout.actions';
import {TranslateService} from '@ngx-translate/core';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component'; 
import { getAuthStatus } from './../../auth/reducers/selectors';
import { PakkeLabelsService } from '../../core/services/pakkelabels.service'

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {

  stateSub$: Subscription;
  orderState: string;
  orderNumber$: Observable<number>;
  shipAddress$: Observable<Address>;
  
  actionsSubscription: Subscription;
  addrs$: Observable<any[]>;

  hasAddrs : boolean;
  showAdrs$ : boolean;
  strMail: string;

  isAuthenticated: boolean;

  pageTrans: any;

  breadcrumbs$: string[] = ['OrderOverview', 'OderDetails'];
  homeLink$: string = '/checkout/address';


  delOptions: any[];
  selectedDel : any;

  @ViewChild(DeliveryAddressComponent) child:DeliveryAddressComponent;

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private checkoutService: CheckoutService,
    private checkoutActions: CheckoutActions,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private pakkelabels:PakkeLabelsService
  ) {
    this.pakkelabels.login().subscribe(data => {

    });

    this.showAdrs$ = true;
    this.orderNumber$ = this.store.select(getOrderNumber);
    this.shipAddress$ = this.store.select(getShipAddress);

      this.stateSub$ = this.store.select(getOrderState).subscribe(state => this.orderState = state);

      this.store.select(getAuthStatus).subscribe((auth) => {
         this.isAuthenticated = auth;
      });   

        this.actionsSubscription = this.route.params.subscribe(
          (params: any) => {
            this.userService.getAddrs(JSON.parse(localStorage.getItem('user')) == null ? localStorage.getItem('userUid') : JSON.parse(localStorage.getItem('user')).email).subscribe(
                response => {
                  console.log(response);
                  if(response.length > 0) {
                    this.showAdrs$ = true;
                    this.hasAddrs = true;
                    this.child.selectAddr('', response[0]);
                    this.GetFreightRates(response[0]);
                  }
                  else {
                    this.showAdrs$ = false;
                    this.hasAddrs = false;
                  }
                  this.addrs$ = response
                } 
              );
          }
        );      
  }

  initDel() {

    this.delOptions = [{
      "prop1":"GLS PakkeShop afhentning",
      "prop2":"40 DKK",
      "prop3" : "1-3 dage",
      "prop4" : 40
    }, {
      "prop1":"GLS Pakkelevering ", 
      "prop2":"50 DKK",
      "prop3" : "1-2 dage",
      "prop4" : 50
    }];

    this.delOptions[0].prop1 = this.pageTrans.prop1;
    this.delOptions[0].prop2 = this.pageTrans.prop2;
    this.delOptions[0].prop3 = this.pageTrans.prop3;
    this.delOptions[0].prop4 = this.pageTrans.prop4;

    this.delOptions[1].prop1 = this.pageTrans.prop5;
    this.delOptions[1].prop2 = this.pageTrans.prop6;
    this.delOptions[1].prop3 = this.pageTrans.prop7;
    this.delOptions[1].prop4 = this.pageTrans.prop8;
  

    this.selectedDel = this.delOptions[0];
    if(this.checkoutService.currentOrder != null)
    this.checkoutService.currentOrder.ship_total = this.delOptions[0].prop4;
  }

  ngAfterViewInit() {
  }


  GetFreightRates(item : Address){
    console.log(item);
    console.log('GetFreightRates');
  }

  ngOnInit() {
    this.translate.get('addrs').subscribe((res: any) => {
      this.pageTrans = res;
      this.breadcrumbs$[0] = this.pageTrans.addrsOverview;
       this.breadcrumbs$[1] = this.pageTrans.createAddr;
    });

    this.initDel();
  }

  checkoutToPayment() {

    if (this.orderState === 'delivery' || this.orderState === 'address') {
      this.checkoutService.changeOrderState()
        .do(() => { 
          this.router.navigate(['/checkout', 'payment']);
        })
        .subscribe();
    } else {
      this.router.navigate(['/checkout', 'payment']);
    }
  }

  ngOnDestroy() {
    if (this.orderState === 'delivery') {
      this.checkoutService.changeOrderState()
        .subscribe();
    }
    this.stateSub$.unsubscribe();
  }

  c01_onSubmit(message:any) {

    this.strMail= JSON.parse(localStorage.getItem('user')) == null ? message : JSON.parse(localStorage.getItem('user')).email
    this.strMail = this.strMail == null ? message : this.strMail;
    this.showAdrs$ = true;

    if(this.isAuthenticated) {
      this.actionsSubscription = this.route.params.subscribe(
        (params: any) => {
          this.userService.getAddrs(this.strMail).subscribe(
              response => {
                this.child.selectAddr('', response[0]);
                if(response.length > 0) this.showAdrs$ = true;
                else this.showAdrs$ = false;
                this.addrs$ = response
              } 
            );
        }
      );
    }
    else {
      var userUid = localStorage.getItem('userUid');
      this.userService.getAddrs(userUid).subscribe(
        response => {
          this.showAdrs$ = true;
          this.addrs$ = response
          this.child.selectAddr('', response[0]);
        } 
      );
    }
  }

  c02(message:any) {
    this.selectedDel = message;
    this.checkoutService.currentOrder.ship_total = message.prop4;
  }

  AddNewAddr(){
    this.showAdrs$ = false;
  }

  ShowAddrs(){
    if(this.hasAddrs) {
      this.showAdrs$ = true;
    }
  }
}
