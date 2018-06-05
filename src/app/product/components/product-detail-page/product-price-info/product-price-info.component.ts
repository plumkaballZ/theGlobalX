import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-price-info',
  templateUrl: './product-price-info.component.html',
  styleUrls: ['./product-price-info.component.scss']
})
export class ProductPriceInfoComponent implements OnInit {
  @Input() product;
  
  price: string;

  constructor() {
   }
  ngOnInit() {
    this.price = this.product.price;
    var langZ = localStorage.getItem('localFlag');

    if(langZ)
      if(langZ == 'gb') this.price = this.product.price_en;
      
  }
}
