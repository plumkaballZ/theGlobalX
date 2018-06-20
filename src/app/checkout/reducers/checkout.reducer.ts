import { LineItem } from './../../core/models/line_item';
import { CheckoutActions } from './../actions/checkout.actions';
import { CheckoutState, CheckoutStateRecord } from './checkout.state';
import { Action, ActionReducer } from '@ngrx/store';
import { createPipeInstance } from '@angular/core/src/view/provider';

export const initialState: CheckoutState = new CheckoutStateRecord() as CheckoutState;



export const checkoutReducer: ActionReducer<CheckoutState> =
  (state: CheckoutState = initialState, { type, payload}: Action): CheckoutState => {

    let _lineItems, _lineItemEntities, _lineItemIds,
        _lineItem, _lineItemEntity, _lineItemId,
        _totalCartItems = 0, _totalCartValue,
        _ship_address, _bill_address,
        _orderState;
              
        switch (type) {
          case CheckoutActions.FETCH_CURRENT_ORDER_SUCCESS:


        const _orderNumber = payload.number;
        _lineItems = payload.line_items;
        _lineItemIds = _lineItems.map(lineItem => lineItem.id);
        _totalCartItems = _lineItemIds.length;
        _totalCartValue = parseFloat(payload.total);
        _ship_address = payload.ship_address;
        _bill_address = payload.bill_address;
        _orderState = payload.state;
        _lineItemEntities = _lineItems.reduce((lineItems: { [id: number]: LineItem }, lineItem: LineItem) => {
          return Object.assign(lineItems, {
            [lineItem.id]: lineItem
          });
        }, { });
        
        return state.merge({
          orderNumber: _orderNumber,
          orderState: _orderState,
          lineItemIds: _lineItemIds,
          lineItemEntities: _lineItemEntities,
          totalCartItems: _totalCartItems,
          totalCartValue: _totalCartValue,
          shipAddress: _ship_address,
          billAddress: _bill_address
        }) as CheckoutState;

      case CheckoutActions.ADD_TO_CART_SUCCESS:

      _lineItem = payload.lineItem;
      _lineItemId = _lineItem.id;
      
      console.log(_lineItem);
        // return the same state if the item is already included.
        if (state.lineItemIds.includes(_lineItemId)) {
          _totalCartItems += _lineItem.quantity;
          console.log('nope');
          return state.merge({
            totalCartItems: _totalCartItems
          }) as CheckoutState;
        }
        
        _totalCartItems = state.totalCartItems + _lineItem.quantity;
        _totalCartValue = state.totalCartValue + parseFloat(_lineItem.total);
 
        _lineItemEntity = { [_lineItemId]: _lineItem };
        _lineItemIds = state.lineItemIds.push(_lineItemId);
        
        return state.merge({
          lineItemIds: _lineItemIds,
          lineItemEntities: state.lineItemEntities.merge(_lineItemEntity),
          totalCartItems: _totalCartItems,
          totalCartValue: _totalCartValue
        }) as CheckoutState;

      case CheckoutActions.REMOVE_LINE_ITEM_SUCCESS:
        _lineItem = payload;
        _lineItemId = _lineItem.id;
        const index = state.lineItemIds.indexOf(_lineItemId);
        if (index >= 0) {
         
          _lineItemIds = state.lineItemIds.splice(index, 1);
          _lineItemEntities = state.lineItemEntities.delete(_lineItemId);
          _totalCartItems = state.totalCartItems - _lineItem.quantity;
          _totalCartValue = (state.totalCartValue - _lineItem.price);
        }

        return state.merge({
          lineItemIds: _lineItemIds,
          lineItemEntities: _lineItemEntities,
          totalCartItems: _totalCartItems,
          totalCartValue: _totalCartValue
        }) as CheckoutState;
        
      case CheckoutActions.CHANGE_ORDER_STATE_SUCCESS:
        _orderState = payload.state;

        return state.merge({
          orderState: _orderState
        }) as CheckoutState;

      case CheckoutActions.UPDATE_ORDER_SUCCESS:
      

      if(payload == null) 
      {
        return state;
      }
        _ship_address = payload.ship_address;
        _bill_address = payload.bill_address;
            
        return state.merge({
          shipAddress: _ship_address,
          billAddress: _bill_address
        }) as CheckoutState;

      case CheckoutActions.ORDER_COMPLETE_SUCCESS:
        return initialState;

      case CheckoutActions.txtGET:
      case CheckoutActions.txtGOT:

      case CheckoutActions.ADD_TO_CART:
   
   
      default:
        return state;
    }
  };


