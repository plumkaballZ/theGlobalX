import { Component, OnInit, Input } from '@angular/core';

import {UserService } from './../../../../user/services/user.service';
import {InlineEditorComponent} from 'ng2-inline-editor';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-product-price-info',
  templateUrl: './product-price-info.component.html',
  styleUrls: ['./product-price-info.component.scss']
})
export class ProductPriceInfoComponent implements OnInit {
  @Input() product;
  constructor(private userService: UserService,private translate: TranslateService) {
    this.loadTxt();
   }

  ngOnInit() {
  }

  loadTxt()
  {
    this.translate.get('prodPrice.prodName').subscribe((res: string) => {
      this.prodName = res;
    });
    this.translate.get('prodPrice.pprice').subscribe((res: string) => {
      this.pprice = res;
    });
    this.translate.get('prodPrice.prodVat').subscribe((res: string) => {
      this.prodVat = res;
    });
  }

  currKey: String;
  prodName :String;
  pprice :String;
  prodVat :String;

  onClick(someValue){
    this.currKey = someValue;
  }
  saveEditable(value) {
    
     var jsonStr = `
     {
       "page" : "prodPrice",
       "fileName" : "` + this.translate.store.currentLang + `.json", 
       "key" : "` + this.currKey +`",
       "line": "` + value + `"
     }`;

    this.userService.postTxt(jsonStr).subscribe(response => { });
  }

}
