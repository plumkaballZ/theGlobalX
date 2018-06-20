import { CheckoutService } from './../../../../../core/services/checkout.service';
import { CheckoutActions } from './../../../../actions/checkout.actions';
import { AppState } from './../../../../../interfaces';
import { Store } from '@ngrx/store';
import { environment } from './../../../../../../environments/environment';
import { LineItem } from './../../../../../core/models/line_item';
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from './../../../../../core/services/product.service';
import { TranslateService } from '@ngx-translate/core';

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
  pageTrans: any;

  size: string;
  color : string;

  @Input() lineItem: LineItem;

  constructor(private store: Store<AppState>, private actions: CheckoutActions, 
    private checkoutService: CheckoutService, productService: ProductService,  private translate: TranslateService) {
      this.prodService = productService;
      console.log('ctor');
      console.log(this.checkoutService.currentOrder.line_items);
   }
  
  ngOnInit() {
    console.log('ctor');
    console.log(this.lineItem);
    this.prodService.getProduct(this.lineItem.id.toString()).subscribe(response => 
      {
        this.image = response.master.images[0].small_url;
        this.name = response.name;
        this.amount = response.display_price;
      }
    );
    
    this.quantity = this.lineItem.quantity;
    this.size = this.lineItem.size;
    this.color = this.lineItem.color;

    this.translate.get('lineItem').subscribe((res: any) => {
      this.pageTrans = res;
    });
  }

  removeLineItem() {
    this.checkoutService.deleteLineItem(this.lineItem)
      .subscribe();
  }
}
