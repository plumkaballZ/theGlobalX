import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit {
  @Output() toggleSize = new EventEmitter();
  selectedSize: string = 'COZY';
  pageTranslator: any;

  constructor(private translate: TranslateService) { 
    this.pageTranslator = {
      "availableProds" : "Displaying available products",
      "popular" : "Popular",
      "new" : "New",
      "discount" : "Discount",
      "low" : "Low",
      "high" : "High",
      "view" : "View"
    }
  }

  ngOnInit() {
     this.translate.get('contentHeader').subscribe((res: any) => {
       this.pageTranslator = res;
     });
  }

  toggleView(view) {
    this.selectedSize = view;
    this.toggleSize.emit({size: view});
  }

  isSmallSelected(): boolean {
    return this.selectedSize === 'COZY';
  }

  isBigSelected(): boolean {
    return this.selectedSize === 'COMPACT';
  }

}
