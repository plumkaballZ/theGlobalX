import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Components
import { FactComp } from './comps/fact/factComp';
import { AboutComp } from './comps/about/aboutComp';
import { ContactComp } from './comps/contact/contactComp';
import { termsComp } from './comps/terms/terms';
import { cookiePolicyComp } from './comps/cookiePolicy/cookiePolicyComp';



import { AppComponent } from './app.component';
// Routes
import { routes } from './app.routes';
// Modules
import { SharedModule } from './shared/index';
import { UserModule } from './user/index';
import { HomeModule } from './home/index';
import { LayoutModule } from './layout/index';
import { CoreModule } from './core/index';
import { StoreModule } from '@ngrx/store';
import { reducer } from './app.reducers';
import { CheckoutHeaderComponent } from './layout/checkout-header/checkout-header.component';
import { CheckoutFooterComponent } from './layout/checkout-footer/checkout-footer.component';


// adding rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/of';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { CustomTranslateLoader } from './_custom/CustomTranslateLoader'


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CheckoutHeaderComponent,
    CheckoutFooterComponent,
    FactComp,
    AboutComp,
    ContactComp,
    termsComp,
    cookiePolicyComp
  ],
  imports: [
    NgbModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
    }),
    RouterModule.forRoot(routes),
    StoreModule.provideStore(reducer),
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    LayoutModule,
    CoreModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
