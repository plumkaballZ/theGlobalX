import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces';
import { UserActions } from '../../actions/user.actions';
import { Observable } from 'rxjs/Observable';
import { Order } from '../../../core/models/order';
import { getUserOrders } from '../../reducers/selector';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  tranz: any;
  

  constructor(
    private store: Store<AppState>,
    private userActions: UserActions,
    private translate: TranslateService
  ) {
    this.orders$ = this.store.select(getUserOrders);
  }
  ngOnInit() {
    this.store.dispatch(this.userActions.getUserOrders());
    this.translate.get('orders').subscribe((res: any) => {
      this.tranz = res;
    });
  }

}
