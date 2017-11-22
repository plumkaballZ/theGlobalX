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
    {
      "id": 3,
      "name": "About Us", 
      "link": 'story'
    },
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
    private router: Router
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
  }
  selectTaxon(taxon) {
    this.router.navigateByUrl(taxon.link);
  }

}
