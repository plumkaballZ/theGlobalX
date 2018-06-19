import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-price-info',
  templateUrl: './product-price-info.component.html',
  styleUrls: ['./product-price-info.component.scss']
})
export class ProductPriceInfoComponent implements OnInit {
  @Input() product;
  
  price: string;
  count: any = 1;

  constructor() {
   }
  ngOnInit() {
    this.price = this.product.display_price;  
  }

  increseCount() {
    this.count += 1;
  }

  decreaseCount() {
    this.count -= 1;
    if (this.count <= 1) {
      this.count = 1;
    }
  }
}
