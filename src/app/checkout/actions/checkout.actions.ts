import { LineItem } from './../../core/models/line_item';
import { Order } from './../../core/models/order';
import { Action } from '@ngrx/store';
import { Product } from './../../core/models/product';

export class CheckoutActions {
  static FETCH_CURRENT_ORDER = 'FETCH_CURRENT_ORDER';
  static FETCH_CURRENT_ORDER_SUCCESS = 'FETCH_CURRENT_ORDER_SUCCESS';
  static ADD_TO_CART = 'ADD_TO_CART';
  static ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
  static REMOVE_LINE_ITEM = 'REMOVE_LINE_ITEM';
  static REMOVE_LINE_ITEM_SUCCESS = 'REMOVE_LINE_ITEM_SUCCESS';
  static CHANGE_LINE_ITEM_QUANTITY = 'CHANGE_LINE_ITEM_QUANTITY';
  static PLACE_ORDER = 'PLACE_ORDER';
  static CHANGE_ORDER_STATE = 'CHANGE_ORDER_STATE';
  static CHANGE_ORDER_STATE_SUCCESS = 'CHANGE_ORDER_STATE_SUCCESS';
  static UPDATE_ORDER = 'UPDATE_ORDER';
  static UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
  static ORDER_COMPLETE_SUCCESS = 'ORDER_COMPLETE_SUCCESS';

  static txtGET = 'GET_TXT';
  static txtGOT = "GOT_TXT";


  fetchCurrentOrder() {
    return { type: CheckoutActions.FETCH_CURRENT_ORDER };
  }

  fetchCurrentOrderSuccess(order: Order, total : number) {
    order.total = total.toString();
    return {
      type: CheckoutActions.FETCH_CURRENT_ORDER_SUCCESS,
      payload: order
    };
  }

  addToCart(prod: Product): Action {
    return {
      type: CheckoutActions.ADD_TO_CART,
      payload: prod
    };
  }
  addToCart_dev(variant_id : number){
    return {
      type: CheckoutActions.ADD_TO_CART,
      payload: variant_id
    };
  }

  addToCartSuccess(lineItem: any): Action {
    return {
      type: CheckoutActions.ADD_TO_CART_SUCCESS,
      payload: lineItem
    };
  }

  removeLineItem(lineItemId: number): Action {
    return {
      type: CheckoutActions.REMOVE_LINE_ITEM,
      payload: lineItemId
    };
  }

  removeLineItemSuccess(lineItem: LineItem): Action {
    return {
      type: CheckoutActions.REMOVE_LINE_ITEM_SUCCESS,
      payload: lineItem
    };
  }

  changeLineItemQuantity(quantity: number, lineItemId: number): Action {
    return {
      type: CheckoutActions.CHANGE_LINE_ITEM_QUANTITY,
      payload: { quantity, lineItemId }
    };
  }

  placeOrder(): Action {
    return { type: CheckoutActions.PLACE_ORDER };
  }

  changeOrderState(): Action {
    return { type: CheckoutActions.CHANGE_ORDER_STATE };
  }

  changeOrderStateSuccess(order: Order): Action {
    return {
      type: CheckoutActions.CHANGE_ORDER_STATE_SUCCESS,
      payload: order
    };
  }

  updateOrder(param): Action {
    return { type: CheckoutActions.UPDATE_ORDER, payload : param };
  }

  updateOrderSuccess(order: Order): Action {
    return {
      type: CheckoutActions.UPDATE_ORDER_SUCCESS,
      payload: order
    };
  }

  orderCompleteSuccess() {
    return { type: CheckoutActions.ORDER_COMPLETE_SUCCESS };
  }

  txtGet(){
    return {type: CheckoutActions.txtGET }
  }
  txtGot(data): Action {
    return {
      type: CheckoutActions.txtGOT,
      payload: data
    };
  }

}
