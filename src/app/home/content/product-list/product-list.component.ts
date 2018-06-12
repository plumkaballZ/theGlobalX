import { getSelectedTaxonIds } from './../../reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { CheckoutService } from './../../../core/services/checkout.service';
import { CheckoutActions } from './../../../checkout/actions/checkout.actions';
import { AppState } from './../../../interfaces';
import { Store } from '@ngrx/store';
import { Product } from './../../../core/models/product';
import { LineItem } from './../../../core/models/line_item';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products;
  @Input('taxonIds') selectedTaxonIds;
  @Input() toggleLayout;
  pageTranslator: any;

  constructor(
    private checkoutService: CheckoutService,
    private store: Store<AppState>,
    private checkoutActions: CheckoutActions, private translate: TranslateService) {
     }
  
     ngOnInit() {
      this.translate.get('prodList').subscribe((res: any) => {
        this.pageTranslator = res;
      });
     }

  getProductImageUrl(url) {
    return environment.API_ENDPOINT + url;
  }

  addToCart(product: Product) {

    const variant_id = product.id;
    this.store.dispatch(this.checkoutActions.addToCart(product));
    

    var _line = new LineItem();
    _line.variant_id = product.id;
    _line.single_display_amount = parseInt(product.price, 10)
    _line.display_amount = parseInt(product.price, 10)
    _line.quantity = 1;
    _line.id = product.id;

    this.checkoutService.addLineItem(_line).subscribe();
  }
  getMargin() {
     return this.toggleLayout.size === 'COZY' ? '0 15px 20px 0' : '0 115px 20px 0';
  }
}
