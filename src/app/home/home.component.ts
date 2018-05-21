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
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {   
  products$: Observable<any>;
  product$:  Observable<Product>;
  taxonomies$: Observable<any>;
  selectedTaxonIds$: Observable<number[]>;
  
  constructor(private store: Store<AppState>, private actions: ProductActions) {
    
    this.store.dispatch(this.actions.getAllProducts());
    
    this.store.dispatch(this.actions.getAllTaxonomies());

    this.products$ = this.store.select(getProducts);

    this.taxonomies$ = this.store.select(getTaxonomies);

    this.selectedTaxonIds$ = this.store.select(getSelectedTaxonIds);
  }
  
  ngOnInit() { 
  }


}
