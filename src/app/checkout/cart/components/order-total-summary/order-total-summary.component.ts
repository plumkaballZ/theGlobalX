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
  stateSub$: Subscription;
  orderState: string;
  pageTranslator: any;

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
    this.translate.get('orderTotal').subscribe((res: any) => {
      this.pageTranslator = res;
    });
    this.initJs();
  }

  initJs() {
    const gap = 120;
    const $rect = $('.rect');
    const threshould = $rect.offset().top + gap;
    const animOption = {easing: 'easein'};

    $(document).on('scroll', debounce(function () {

      if ($(window).scrollTop() > threshould && $(window).width() > 800) {
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
