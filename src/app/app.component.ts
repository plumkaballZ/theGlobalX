import { getAuthStatus } from './auth/reducers/selectors';
import { AppState } from './interfaces';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CheckoutService } from './core/services/checkout.service';
import { tranzLat0r } from './core/models/tranzLat0r';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
declare var jQuery:any;
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

  tranz: any = {"cookieText" : "", "privatePolicy" : ""};

  _tranz : tranzLat0r;

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
        this.orderSub$ = this.checkoutService.fetchCurrentOrder().subscribe(res => {
        });
      });

      this.translate.get('app').subscribe((res: any) => {
        this.tranz = res;
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

  goToLink(str) {
    this.router.navigateByUrl(str);
  }
  initJs(){
    jQuery(document).ready(function() { 
      
  
      var cookie: any = false;

      var cookieContent = $('.cookie-disclaimer');
  
      checkCookie();

       if (cookie == true) {
         cookieContent.hide();
       }

      function setCookie(cname, cvalue, exdays) {
        localStorage.setItem('cookie_Z', 'true');
      }

      function checkCookie() {
        
        var cookie_Z = localStorage.getItem('cookie_Z');

        if (cookie_Z != null) {
          cookie = true;
        }
      }

      function deleteCookie() {
        localStorage.removeItem('cookie_Z');
      }

      $('.accept-cookie').click(function () {
        setCookie("cname", "cvalue", 365);
        cookieContent.hide();
      });

      $('.decline-cookie').click(function () {
          deleteCookie();
      });
  });

    // $(document).ready(function(){

    //   $(".super-button").click(function() {
    //     removeStuff();
    //   });

    //   $(".overlay").click(function() {
    //     removeStuff();
    //   });

    //   function removeStuff(){

    //     $(".upperPic").addClass("upperPichover");
    //     $(".lowerPic").addClass("lowerPichover");
    //     $(".Pic").removeClass("Pic");
    
    //     $(".mainZ").remove();
    

    //     $(".contentz").removeClass("contentz");
    //     $(".default").unwrap();

    //     setTimeout(function(){
    //       $(".upperPic").removeClass("upperPic");
    //       $(".lowerPic").removeClass("lowerPic");
    //       $(".upperPicTxt").remove();
    //       $(".upperPicTxt").removeClass("upperPicTxt");
    //     }, 800);
    //   }
    // });	
  }
}
