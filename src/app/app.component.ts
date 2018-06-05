import { getAuthStatus } from './auth/reducers/selectors';
import { AppState } from './interfaces';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CheckoutService } from './core/services/checkout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  orderSub$: Subscription;
  currentUrl: string;
  currentStep: string;
  checkoutUrls = ['/checkout/cart', '/checkout/address', '/checkout/payment'];

  constructor(
    private router: Router,
    private checkoutService: CheckoutService,
    private store: Store<AppState>, 
    private translate: TranslateService
    ) {

    router
      .events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => {
        this.currentUrl = e.url;
        this.findCurrentStep(this.currentUrl);
        window.scrollTo(0, 0);
      });

      var localFlag = localStorage.getItem('localFlag');
      if(localFlag) translate.use(localFlag)
      else translate.use('dk')
  }

  ngOnInit() {
    this.initJs();
    this.store.select(getAuthStatus).
      subscribe(() => {
        this.orderSub$ = this.checkoutService.fetchCurrentOrder().subscribe();
      });
  }

  isCheckoutRoute() {
    if (!this.currentUrl) {
      return false;
    }
    const index = this.checkoutUrls.indexOf(this.currentUrl);
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }
  
  private findCurrentStep(currentRoute) {
    const currRouteFragments = currentRoute.split('/');
    const length = currRouteFragments.length;
    this.currentStep = currentRoute.split('/')[length - 1];
  }

  ngOnDestroy() {
    this.orderSub$.unsubscribe();
  }

  initJs(){
    $(document).ready(function(){

      $(".super-button").click(function() {
        removeStuff();
      });

      $(".overlay").click(function() {
        removeStuff();
      });

      function removeStuff(){

        $(".upperPic").addClass("upperPichover");
        $(".lowerPic").addClass("lowerPichover");
        $(".Pic").removeClass("Pic");
    
        $(".mainZ").remove();
    

        $(".contentz").removeClass("contentz");
        $(".default").unwrap();

        setTimeout(function(){
          $(".upperPic").removeClass("upperPic");
          $(".lowerPic").removeClass("lowerPic");
          $(".upperPicTxt").removeClass("upperPicTxt");
        }, 800);
      }
    });	
  }
}
