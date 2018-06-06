import { Component, OnInit, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() taxonomies;
  
  breadcrumbs: string[] = ['Home', 'Categories'];

  pageTranslator: any;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.get('breadcrumb').subscribe((res: any) => {
      this.pageTranslator = res;
      this.breadcrumbs[0] = this.pageTranslator.home;
      this.breadcrumbs[1] = this.pageTranslator.categories;
    });
  }

}
