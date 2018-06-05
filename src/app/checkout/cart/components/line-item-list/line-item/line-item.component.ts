import { CheckoutService } from './../../../../../core/services/checkout.service';
import { CheckoutActions } from './../../../../actions/checkout.actions';
import { AppState } from './../../../../../interfaces';
import { Store } from '@ngrx/store';
import { environment } from './../../../../../../environments/environment';
import { LineItem } from './../../../../../core/models/line_item';
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './../../../../../core/services/product.service';

@Component({
  selector: 'app-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent implements OnInit {
  prodService: ProductService;
  image: string;
  name: string;
  quantity: number;
  amount: string;

  @Input() lineItem: LineItem;

  constructor(private store: Store<AppState>, private actions: CheckoutActions, 
    private checkoutService: CheckoutService, productService: ProductService ) {
      this.prodService = productService;
   }
  
  ngOnInit() {
    // this.products$ = this.store.select(getProducts);

    if(this.lineItem.prod == null) {
      console.log(this.lineItem);
      this.prodService.getProduct(this.lineItem.id.toString()).subscribe(response => 
        {
          this.image = response.master.images[0].small_url;
          this.name = response.name;
        }
      );
    }
    else {
      this.image = this.lineItem.prod.master.images[0].small_url;
      this.name = this.lineItem.prod.name;
    }

    this.quantity = this.lineItem.quantity;
    this.amount = this.lineItem.price
  }

  removeLineItem() {
    this.checkoutService.deleteLineItem(this.lineItem)
      .subscribe();
  }
}
