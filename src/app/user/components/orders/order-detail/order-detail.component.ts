import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../interfaces';
import { UserActions } from '../../../actions/user.actions';
import { UserService } from '../../../services/user.service';
import { Order } from '../../../../core/models/order';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';
import { LineItem } from '../../../../core/models/line_item';
import { CheckoutActions } from './../../../../checkout/actions/checkout.actions';
import { CheckoutService } from './../../../../core/services/checkout.service';
import { ProductService } from './../../../../core/services/product.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  routeSubscription$: Subscription;
  orderSubscription$: Subscription;
  orderNumber: String;
  order: Order;
  isAdmin : boolean;

  tranz: any;


  private _store: Store<AppState>;
  private _actions: CheckoutActions;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    store: Store<AppState>, actions: CheckoutActions,
    private checkoutService: CheckoutService,
    private prodService: ProductService,
    private router: Router,
    private translate: TranslateService
  ) {
    this._store = store;
    this._actions = actions;
  }

  ngOnInit() {

    this.translate.get('orderDetails').subscribe((res: any) => {
      this.tranz = res;
    });
    
    this.routeSubscription$ = this.route.params.subscribe(
      (params: any) => {
        
        this.orderNumber = params['number'];

        console.log(this.orderNumber);

        this.orderSubscription$ =
          this.userService
          .getOrderDetail(this.orderNumber)
          .subscribe(order => {
            this.order = order
            this.order.line_items.forEach(lineItem => {
              this.prodService.getProduct(lineItem.id.toString()).subscribe(response => {
                  lineItem.prod = response;
                }
              );
            });
           
           
          });
     }
    );

    var localUser = JSON.parse(localStorage.getItem('user'));
    
    if(localUser != null) 
      if(localUser.lvl == 99) this.isAdmin = true;
  }

  getProductImageUrl(line_item: LineItem) {
    const image_url = line_item.variant.images[0].small_url;
    return environment.API_ENDPOINT + image_url;
  }
  ngOnDestroy() {
    this.routeSubscription$.unsubscribe();
    this.orderSubscription$.unsubscribe();
  }

  confirmOrder(){
    this.order.shipment_state = "1";
    this.order.special_instructions = 'updateShipment';
    this._store.dispatch(this._actions.updateOrder(this.order));
    this.router.navigate(['/user', 'orders']);
  }

}
