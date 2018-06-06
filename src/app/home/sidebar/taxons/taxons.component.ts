import { SearchActions } from './../../reducers/search.actions';
import { getFilters } from './../../reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from './../../../interfaces';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-taxons',
  templateUrl: './taxons.component.html',
  styleUrls: ['./taxons.component.scss']
})
export class TaxonsComponent implements OnInit {
  @Input() taxonomies;
  searchFilters$: Observable<any>;
  selectedFilters = [];

  pageTranslator: any;

  constructor(private store: Store<AppState>, 
    private actions: SearchActions,
    private ref: ChangeDetectorRef, private translate: TranslateService) {
    this.searchFilters$ = this.store.select(getFilters);
    this.searchFilters$.subscribe(data => {
      this.selectedFilters = data;
    });
    
    this.pageTranslator = {
      "serachTerms" : "Search Terms",
      "category" : "Category"
    };
  }

  ngOnInit() {
    this.translate.get('taxons').subscribe((res: any) => {
      this.pageTranslator = res;
    });

    this.initStuff();
  }

  isChecked(taxon) {
    let result = false;
    this.selectedFilters.forEach((filter) => {
      if (filter.id === taxon.id) {
        result = true;
      }
    });
    return result;
  }

  taxonSelected(taxon, checked) {
    if (checked) {
      this.store.dispatch(this.actions.addFilter(taxon));
    } else {
      this.store.dispatch(this.actions.removeFilter(taxon));
    }
  }

  initStuff(){

    var Search = {
      
      searchForm: $("#search-form"),
      searchTerms: $("#search-terms"),
      searchFilters: $("#search-filters"),
      searchFiltersTitle: $("#search-filters-title"),
      offset: $("#search-filters-title").offset(),
      win: $(window),
      
      init: function() {
        Search.bindUIEvents();
      },
    
      bindUIEvents: function() {
        
        Search.searchFiltersTitle
          .on(
            "click",
            Search.toggleSearchFilters
          );
        
        Search.win
          .on(
            "scroll",
            Search.filterHeaderPosition
           );
        
        Search.searchForm
          .on(
             "submit",
            Search.searchSubmit
           );
        
      },
      
      toggleSearchFilters: function() {
        Search.searchForm
          .toggleClass("filters-open");
      },
      
      filterHeaderPosition: function() {
        
         var scrollTop = Search.win.scrollTop();
               
         if (scrollTop > Search.offset.top) {
           Search.searchFilters.addClass("pinned");
           Search.searchTerms.css("margin-bottom", Search.searchFilters.outerHeight());
         } else {
           Search.searchFilters.removeClass("pinned"); 
           Search.searchTerms.css("margin-bottom", "10px");
         };
        
      },
    
      searchSubmit: function() {
        return false; 
      }
    
    };
    
    Search.init();
  }

  
}
