import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductActions } from './../product/actions/product-actions';
import { SearchActions } from './reducers/search.actions';
import { SharedModule } from './../shared/index';
import { ProductService } from './../core/services/product.service';

//prod comps.. clean this up plz :D
import { ProductDetailPageComponent } from './../product/components/product-detail-page/product-detail-page.component';
import { ProductDetailsComponent } from './../product/components/product-detail-page/product-details/product-details.component';
import { ProductDescriptionComponent } from './../product/components/product-detail-page/product-description/product-description.component';
import { ProductImagesComponent } from './../product/components/product-detail-page/product-images/product-images.component';
import { ProductPriceInfoComponent } from './../product/components/product-detail-page/product-price-info/product-price-info.component';
import { ProductVariantsComponent } from './../product/components/product-detail-page/product-variants/product-variants.component';
import { ProductComponent } from './../product/product.component';

import { ProductListComponent } from './content/product-list/product-list.component';
import { ProductListItemComponent } from './content/product-list/product-list-item/product-list-item.component';
import { FilterSummaryComponent } from './content/filter-summary/filter-summary.component';
import { CustomizeComponent } from './content/customize/customize.component';
import { ContentHeaderComponent } from './content/content-header/content-header.component';
import { ContentComponent } from './content/content'; 

//prod effects
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './../product/effects/product.effects';

// Components
import { HomeComponent } from './home.component';
// Breadcrumb components
import { BreadcrumbComponent } from './breadcrumb/components/breadcrumb/breadcrumb.component';



// Sidebar components
import { TaxonsComponent } from './sidebar/taxons/taxons.component';
import { FilterComponent } from './sidebar/filter/filter.component';
// Routes
import { HomeRoutes as routes } from './home.routes';

import { FilterPipe } from './content/product-list/product-filter.pipe';

//lang stuff yay :D
import {HttpClientModule, HttpClient} from '@angular/common/http';


@NgModule({
  declarations: [
    ProductDetailPageComponent,
    ProductDetailsComponent,
    ProductDescriptionComponent,
    ProductImagesComponent,
    ProductPriceInfoComponent,
    ProductVariantsComponent,
    ProductComponent,
    
    // components
    HomeComponent,
    TaxonsComponent,
    FilterComponent,
    BreadcrumbComponent,
    ContentHeaderComponent,
    CustomizeComponent,
    FilterSummaryComponent,
    ProductListComponent,
    ProductListItemComponent,
    ContentComponent,
    // pipes
    FilterPipe,
  ],
  exports: [
  ],
  imports: [
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [
    ProductActions,
    SearchActions
  ]
})
export class HomeModule {}
