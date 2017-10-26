import { Product } from './../../core/models/product';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `<app-product-detail-page></app-product-detail-page>`
})
export class ContentComponent implements OnInit {
  @Input() products: Product[];
  @Input() taxonIds;
  toggleLayout = {size: 'COZY'};

  constructor() {
   }

  ngOnInit() {
  }
  
  toggleSize(layoutInfo) {
    this.toggleLayout = layoutInfo;
  }
}
