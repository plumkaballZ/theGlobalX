import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from './core/guards/auth.guard';

import { FactComp } from './comps/fact/factComp';
import { StoryComp } from './comps/story/storyComp';
import { ContactUsComp } from './comps/contactUs/contactUsComp';

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
  {path: 'story', component: StoryComp},
  {path: 'contact', component: ContactUsComp}
];
