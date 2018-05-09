import { Router } from '@angular/router';
import { SearchActions } from './../../home/reducers/search.actions';
import { getTaxonomies } from './../../product/reducers/selectors';
import { getTotalCartItems } from './../../checkout/reducers/selectors';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces';
import { getAuthStatus } from '../../auth/reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from '../../auth/actions/auth.actions';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './rez_Master.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  totalCartItems: Observable<number>;
  taxonomies$: Observable<any>;

  taxonList = [
    {
    "id": 1,
    "name": "Home", 
    "link": ''
    },
    {
    "id": 2,
    "name": "Facts", 
    "link": 'fact'
    },
    // {
    //    "id": 3,
    //    "name": "About Us", 
    //    "link": 'story'
    //  },
    {
    "id": 4,
    "name": "Contact",
    "link": 'contact'
    }
  ];

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private authActions: AuthActions,
    private searchActions: SearchActions,
    private router: Router,
    private translate: TranslateService
  ) 
  {
    this.taxonomies$ = this.store.select(getTaxonomies);
  }
  
  sTbState: string = 'invisible';

  toggleSearchBar(e, el) {
  this.sTbState = (this.sTbState === 'invisible' ? 'visible' : 'invisible');
  if (this.sTbState === 'visible') {
    el.focus();
  }
}
  ngOnInit() {
    this.store.dispatch(this.authActions.authorize());
    this.isAuthenticated = this.store.select(getAuthStatus);
    this.totalCartItems = this.store.select(getTotalCartItems);
    
    this.translate.get('header.home').subscribe((res: string) => {
      this.taxonList[0].name = res;
    });
    this.translate.get('header.facts').subscribe((res: string) => {
      this.taxonList[1].name = res;
    });
    //  this.translate.get('header.about').subscribe((res: string) => {
    //    this.taxonList[2].name = res;
    //  });
    this.translate.get('header.contact').subscribe((res: string) => {
      this.taxonList[2].name = res;
    });
  }
  selectTaxon(taxon) {
    this.router.navigateByUrl(taxon.link);
  }

  isIn = false;
  
  toggleState() { // click handler
    let bool = this.isIn;
    this.isIn = bool === false ? true : false; 
}
}