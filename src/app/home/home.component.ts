import { getSelectedTaxonIds } from './reducers/selectors';
import { Taxonomy } from './../core/models/taxonomy';
import { environment } from './../../environments/environment';
import { ProductActions } from './../product/actions/product-actions';
import { AppState } from './../interfaces';
import { getProducts, getTaxonomies } from './../product/reducers/selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from '../core/models/product';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  template: `
  <div *ngIf="product$ != null">
  <app-product-details [product]="product$"></app-product-details>
  </div>`,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // products$: Observable<any>;
  // product$: Product = null;
  // taxonomies$: Observable<any>;
  // selectedTaxonIds$: Observable<number[]>;

  actionsSubscription: Subscription;
  product$: Product = null;
  routeSubs: Subscription;
  productId: any;


  constructor(private store: Store<AppState>, private actions: ProductActions) {
    // Get all products for the product list component
    
    // this.store.dispatch(this.actions.getAllProducts());
    // this.store.dispatch(this.actions.getAllTaxonomies());

    // this.products$ = this.store.select(getProducts);
    // this.taxonomies$ = this.store.select(getTaxonomies);
    // this.selectedTaxonIds$ = this.store.select(getSelectedTaxonIds);

    // this.actionsSubscription = this.route.params.subscribe(
    //   (params: any) => {
    //     this.productId = params['id'];
    //     this.productService
    //       .getProduct(this.productId)
    //       .subscribe(response => this.product$ = response);
    //  }
    // );
  }

  ngOnInit() { 
  }

  // <app-breadcrumb [taxonomies]="taxonomies$ | async"></app-breadcrumb>
  // <div class="col-xs-12">
  //   <div class="col-xs-3">
  //     <app-taxons [taxonomies]="taxonomies$ | async"></app-taxons>
  //   </div>
  //   <div class="col-xs-9">
  //     <app-content 
  //       [products]="products$ | async" 
  //       [taxonIds]="selectedTaxonIds$ | async">
  //     </app-content>
  //   </div>
  // </div>
}
