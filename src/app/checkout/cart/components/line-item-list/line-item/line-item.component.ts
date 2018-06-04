import { CheckoutService } from './../../../../../core/services/checkout.service';
import { CheckoutActions } from './../../../../actions/checkout.actions';
import { AppState } from './../../../../../interfaces';
import { Store } from '@ngrx/store';
import { environment } from './../../../../../../environments/environment';
import { LineItem } from './../../../../../core/models/line_item';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line-item',
  templateUrl: './line-item.component.html',
  styleUrls: ['./line-item.component.scss']
})
export class LineItemComponent implements OnInit {

  image: string;
  name: string;
  quantity: number;
  amount: string;

  @Input() lineItem: LineItem;

  constructor(private store: Store<AppState>, private actions: CheckoutActions, private checkoutService: CheckoutService) {
   }
   
  ngOnInit() {
    
    console.log(this.lineItem);
    // this.products$ = this.store.select(getProducts);

    if(this.lineItem.prod != null){

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
