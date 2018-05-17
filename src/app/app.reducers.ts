import { searchReducer } from './home/reducers/search.reducers';
import { environment } from './../environments/environment';
import { productReducer } from './product/reducers/product-reducer';
import { ProductState } from './product/reducers/product-state';
import { userReducer } from './user/reducers/user.reducer';
import { checkoutReducer } from './checkout/reducers/checkout.reducer';
import { authReducer } from './auth/reducers/auth.reducer';

import { combineReducers, ActionReducer } from '@ngrx/store';

import { AppState } from './interfaces';
import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';

const reducers = {
  products: productReducer,
  auth: authReducer,
  checkout: checkoutReducer,
  users: userReducer,
  search: searchReducer
};

export const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers); ;
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

/**
 *
 *
 * @export
 * @param {*} state
 * @param {*} action
 * @returns
 */

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

