import { Component, OnInit, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'breadCrumbz',
  templateUrl: './breadCrumbz.html',
  styleUrls: ['./breadCrumbz.scss']
})
export class breadCrumbzComp implements OnInit {
  @Input() crumbz;
  @Input() homeLink;


  pageTranslator: any;

  constructor(private translate: TranslateService) {
   }

  ngOnInit() {

  }

}
