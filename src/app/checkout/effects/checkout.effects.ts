import { LineItem } from './../../core/models/line_item';
import { CheckoutService } from './../../core/services/checkout.service';
import { CheckoutActions } from './../actions/checkout.actions';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class CheckoutEffects {

  constructor(private actions$: Actions,
  private checkoutService: CheckoutService,
  private actions: CheckoutActions) {}

  // tslint:disable-next-line:member-ordering
  
  @Effect()
    AddToCart$ = this.actions$
    .ofType(CheckoutActions.ADD_TO_CART)
    .switchMap((action: Action) => {
      return this.checkoutService.createNewLineItem(action.payload);
    }).map((data: any) => this.actions.addToCartSuccess({lineItem: data}));

    @Effect()
    FetchCurrentOrder$ = this.actions$
    .ofType(CheckoutActions.UPDATE_ORDER)
    .switchMap((action: Action) => {
      return this.checkoutService.updateOrder(action.payload);
    })
    .map((data: any) => {
      console.log('updateOrderSuccess');
      return this.actions.updateOrderSuccess(data);
    });

    @Effect()
    txtGet$ = this.actions$
    .ofType(CheckoutActions.txtGET)
    .switchMap((action: Action) => {
      return this.checkoutService.getTxt();
    })
    .map((data: any) => {
      return this.actions.txtGot(data);
    });
  }



    
  // Use this effect once angular releases RC4

  // @Effect()
  //   RemoveLineItem$ = this.actions$
  //   .ofType(CartActions.REMOVE_LINE_ITEM)
  //   .switchMap((action: Action) => {
  //     return this.cartService.deleteLineItem(action.payload);
  //   })
  //   .map(() => this.cartActions.removeLineItemSuccess());

