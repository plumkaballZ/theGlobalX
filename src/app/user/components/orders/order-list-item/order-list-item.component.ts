import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../../core/models/order';
import { environment } from '../../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss']
})
export class OrderListItemComponent implements OnInit {
  @Input() order: Order;
  pageTrans: any;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    console.log(this.order);
    this.translate.get('orderList').subscribe((res: any) => {
      this.pageTrans = res;
    });
  }

  getProductImageUrl(url) {
    return environment.API_ENDPOINT + url;
  }

}
