import { getOrderState } from './../../../reducers/selectors';
import { Router } from '@angular/router';
import { CheckoutService } from './../../../../core/services/checkout.service';
import { CheckoutActions } from './../../../actions/checkout.actions';
import { AppState } from './../../../../interfaces';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-order-total-summary',
  templateUrl: './order-total-summary.component.html',
  styleUrls: ['./order-total-summary.component.scss']
})
export class OrderTotalSummaryComponent implements OnInit, OnDestroy {

  cupon001: string;
  cupon002: string;
  cupon003: string;

  bag001: string;

  delivery001: string;
  delivery002: string;

  order001: string;

  total001: string;



  stateSub$: Subscription;
  orderState: string;
  @Input() totalCartValue: number;


  constructor(private store: Store<AppState>,
    private actions: CheckoutActions,
    private checkoutService: CheckoutService,
    private router: Router,
    private translate: TranslateService) {
  this.stateSub$ = this.store.select(getOrderState)
    .subscribe(state => this.orderState = state);
  }

  ngOnInit() {
    this.translate.get('orderTotal.cupon001').subscribe((res: string) => {
      this.cupon001 = res;
    });
    this.translate.get('orderTotal.cupon002').subscribe((res: string) => {
      this.cupon002 = res;
    });

    this.translate.get('orderTotal.cupon003').subscribe((res: string) => {
      this.cupon003 = res;
    });

    this.translate.get('orderTotal.bag001').subscribe((res: string) => {
      this.bag001 = res;
    });

    this.translate.get('orderTotal.delivery001').subscribe((res: string) => {
      this.delivery001 = res;
    });

    this.translate.get('orderTotal.delivery002').subscribe((res: string) => {
      this.delivery002 = res;
    });

    this.translate.get('orderTotal.order001').subscribe((res: string) => {
      this.order001 = res;
    });

    this.translate.get('orderTotal.total001').subscribe((res: string) => {
      this.total001 = res;
    });
    

    this.initJs();
  }

  initJs(){

    const gap = 120;
    const $rect = $('.rect');
    const threshould = $rect.offset().top + gap;
    const animOption = {easing: 'easein'};
    
    $(document).on('scroll', debounce(function () {
      console.log('scroll');
      if ($(window).scrollTop() > threshould) {
        $rect.animate('stop').css({
          top: $(window).scrollTop() + gap
        }, animOption);
      } else {
        $rect.animate('stop').css({
          top: threshould - gap
        }, animOption)
      }
    }, 30));
    
    function debounce (fn, wait) {
      let timer = null;
      function timeouted () {
        fn.call(fn);
        timer = null;
      }
      return () => {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(timeouted, wait);
      }
    }
  }

  placeOrder() {
    if (this.orderState === 'cart') {
      this.checkoutService.changeOrderState()
        .do(() => {
          this.router.navigate(['/checkout', 'address']);
        })
        .subscribe();
    } else {
      this.router.navigate(['/checkout', 'address']);
    }
  }

  ngOnDestroy() {
    this.stateSub$.unsubscribe();
  }
}
