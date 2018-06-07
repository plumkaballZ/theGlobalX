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

  @Input() lineItem: LineItem;

  constructor(private store: Store<AppState>, private actions: CheckoutActions, 
    private checkoutService: CheckoutService, productService: ProductService,  private translate: TranslateService) {
      this.prodService = productService;
   }
  
  ngOnInit() {
    this.prodService.getProduct(this.lineItem.id.toString()).subscribe(response => 
      {
        this.image = response.master.images[0].small_url;
        this.name = response.name;
        this.amount = response.display_price;
      }
    );

    // if(this.lineItem.prod == null) {
    //   this.prodService.getProduct(this.lineItem.id.toString()).subscribe(response => 
    //     {
    //       this.image = response.master.images[0].small_url;
    //       this.name = response.name;
    //       this.amount = response.price;
    //     }
    //   );
    // }
    // else {
    //   this.image = this.lineItem.prod.master.images[0].small_url;
    //   this.name = this.lineItem.prod.name;
    //   this.amount = this.lineItem.prod.price;
    // }

    this.quantity = this.lineItem.quantity;

    this.translate.get('lineItem').subscribe((res: any) => {
      this.pageTrans = res;
    });
  }

  removeLineItem() {
    this.checkoutService.deleteLineItem(this.lineItem)
      .subscribe();
  }
}
