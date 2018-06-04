import { AppState } from './../../../interfaces';
import { Store } from '@ngrx/store';
import { getTotalCartValue, getTotalCartItems } from './../../reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { Order } from './../../../core/models/order';
import { CheckoutService } from './../../../core/services/checkout.service';
import { Component, OnInit, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-delivery-options',
  templateUrl: './delivery-options.component.html',
  styleUrls: ['./delivery-options.component.scss']
})
export class DeliveryOptionsComponent implements OnInit {

  delSpeed: string;
  stdDel: string;
  freeDel: string;
  totalItems: string;

  orderTotal001: string;
  orderTotal002: string;

  del001: string;
  del002: string;

  totalPay: string;


  @Input() orderNumber;
  order;
  selectedShippingRate;
  shippingRates = [];
  
  totalCartValue$: Observable<number>;
  totalCartItems$: Observable<number>;

  constructor(private checkoutService: CheckoutService, private store: Store<AppState>, private translate: TranslateService) {
    this.totalCartValue$ = this.store.select(getTotalCartValue);
    this.totalCartItems$ = this.store.select(getTotalCartItems);
  }

  ngOnInit() {
    this.translate.get('del.delSpeed').subscribe((res: string) => {
      this.delSpeed = res;
    });
    this.translate.get('del.stdDel').subscribe((res: string) => {
      this.stdDel = res;
    });

    this.translate.get('del.freeDel').subscribe((res: string) => {
      this.freeDel = res;
    });

    this.translate.get('del.totalItems').subscribe((res: string) => {
      this.totalItems = res;
    });

    this.translate.get('del.orderTotal001').subscribe((res: string) => {
      this.orderTotal001 = res;
    });

    this.translate.get('del.orderTotal002').subscribe((res: string) => {
      this.orderTotal002 = res;
    });

    this.translate.get('del.del001').subscribe((res: string) => {
      this.del001 = res;
    });

    this.translate.get('del.del002').subscribe((res: string) => {
      this.del002 = res;
    });
    
    this.translate.get('del.totalPay').subscribe((res: string) => {
      this.totalPay = res;
    });

    // this.setOrder();
  }

  private setOrder() {
    this.checkoutService.getOrder(this.orderNumber)
      .subscribe((order) => {
        this.order = order;
        this.setShippingRates();
      });
  }

  private setShippingRates() {
    this.shippingRates = this.order.shipments[0].shipping_rates;
    this.selectedShippingRate = this.order.shipments[0].selected_shipping_rate;
  }

}
