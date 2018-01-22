import { Action } from '@ngrx/store';
import { Order } from '../../core/models/order';

export class UserActions {
  static GET_USER_ORDERS = 'GET_USER_ORDERS';
  static GET_USER_ORDERS_SUCCESS = 'GET_USER_ORDERS_SUCCESS';
  static GET_USER_ADDRS = 'GET_USER_ADDRS';

  getUserAddrs(): Action{
    return { type: UserActions.GET_USER_ADDRS };
  }
  
  getUserOrders(): Action {
    return { type: UserActions.GET_USER_ORDERS };
  }
  getUserOrdersSuccess(orders: Order[]): Action {
    return { type: UserActions.GET_USER_ORDERS_SUCCESS, payload: orders };
  }
}
