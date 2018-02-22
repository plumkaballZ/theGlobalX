import { Component, OnInit, Input } from '@angular/core';

import {UserService } from './../../../../user/services/user.service';
import {InlineEditorComponent} from 'ng2-inline-editor';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  @Input() description;
  constructor(private userService: UserService, private translate: TranslateService) { 
    this.loadTxt();
  }
  
  currKey: String;
  desc :string;

  loadTxt()
  {
    this.translate.get('prodDesc.desc').subscribe((res: string) => {
      this.desc = res;
    });
  }
  onClick(someValue){
    this.currKey = someValue;
  }
  saveEditable(value) {
     var jsonStr = `
     {
       "page" : "prodDesc",
       "fileName" : "` + this.translate.store.currentLang + `.json", 
       "key" : "` + this.currKey +`",
       "line": "` + value + `"
     }`;

    this.userService.postTxt(jsonStr).subscribe(response => { });
  }

  ngOnInit() {
  }

}
