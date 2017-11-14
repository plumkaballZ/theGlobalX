import { getSelectedTaxonIds } from './reducers/selectors';
import { Taxonomy } from './../core/models/taxonomy';
import { environment } from './../../environments/environment';
import { ProductActions } from './../product/actions/product-actions';
import { AppState } from './../interfaces';
import { getProducts, getTaxonomies, getSelectedProduct } from './../product/reducers/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from '../core/models/product';

@Component({
  selector: 'app-home',
  template: `<app-content></app-content>`,
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
   
  products$: Observable<any>;
  product$:  Observable<Product>;
  taxonomies$: Observable<any>;
  selectedTaxonIds$: Observable<number[]>;
  
  constructor(private store: Store<AppState>, private actions: ProductActions) {
  }
  ngOnInit() { 
  }
}
