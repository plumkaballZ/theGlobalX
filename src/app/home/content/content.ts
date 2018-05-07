import { Product } from './../../core/models/product';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-content',
  template: `<app-content-header (toggleSize)="toggleSize($event)"></app-content-header>
  <app-filter-summary></app-filter-summary>
  <app-customize></app-customize>
  <app-product-list [(toggleLayout)]='toggleLayout' [products]='products' [taxonIds]="taxonIds"></app-product-list>
  `
})

// <app-product-detail-page></app-product-detail-page>
export class ContentComponent implements OnInit {
  @Input() products: Product[];
  @Input() taxonIds;
  toggleLayout = {size: 'COZY'};

  constructor() {
    console.log('content');
   }

  ngOnInit() {
  }
  
  toggleSize(layoutInfo) {
    this.toggleLayout = layoutInfo;
  }
}
