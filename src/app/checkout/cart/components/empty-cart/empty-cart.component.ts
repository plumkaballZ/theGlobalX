import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-empty-cart',
  templateUrl: './empty-cart.component.html',
  styleUrls: ['./empty-cart.component.scss']
})
export class EmptyCartComponent implements OnInit {
  
  pageTrans: any;


  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('emptyBag').subscribe((res: any) => {
      this.pageTrans = res;
    });
  }

}
