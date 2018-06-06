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
import {TranslateService} from '@ngx-translate/core';
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
  pageTranslator: any;
  
  constructor(private store: Store<AppState>, private actions: ProductActions, private translate: TranslateService) {
    this.store.dispatch(this.actions.getAllProducts());
    
    this.store.dispatch(this.actions.getAllTaxonomies());

    this.products$ = this.store.select(getProducts);

    this.taxonomies$ = this.store.select(getTaxonomies);
    this.taxonomies$.subscribe(data => {
      
      if(data[0] != null)
      { 
         this.translate.get('taxons').subscribe((res: any) => {
           data[0].name = res.clothing;
           data[0].root.taxons[0].name = res.socks;

           data[1].name = res.accessories;
           data[1].root.taxons[0].name = res.cardholders;
           data[1].root.taxons[1].name = res.belts;
           data[1].root.taxons[2].name = res.keyhangers;
         });
      }
    });

    this.selectedTaxonIds$ = this.store.select(getSelectedTaxonIds);
    
  }
  
  ngOnInit() { 
  }


}
