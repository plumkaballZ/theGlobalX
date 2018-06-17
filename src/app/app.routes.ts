import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from './core/guards/auth.guard';

import { FactComp } from './comps/fact/factComp';
import { AboutComp } from './comps/about/aboutComp';
import { ContactComp } from './comps/contact/contactComp';
import { termsComp } from './comps/terms/terms'
import { cookiePolicyComp } from './comps/cookiePolicy/cookiePolicyComp'

export const routes: Routes = [
  {
    path: '',
    loadChildren: './home/index#HomeModule' },
  {
    path: 'checkout',
    loadChildren: './checkout/checkout.module#CheckoutModule' },
  {
    path: 'user',
    loadChildren: './user/index#UserModule',
    canActivate: [ CanActivateViaAuthGuard ]
  },
  {
    path: 'product',
    loadChildren: './product/index#ProductModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {path: 'fact', component: FactComp},
  {path: 'story', component: AboutComp},
  {path: 'contact', component: ContactComp},
  {path: 'terms', component: termsComp},
  {path: 'cookiePolicy', component: cookiePolicyComp}
];
