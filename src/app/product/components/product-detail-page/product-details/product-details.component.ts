import { AppState } from './../../../../interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CheckoutService } from './../../../../core/services/checkout.service';
import { CheckoutActions } from './../../../../checkout/actions/checkout.actions';

import { Variant } from './../../../../core/models/variant';
import { VariantRetriverService } from './../../../../core/services/variant-retriver.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../../../core/models/product';
import { environment } from './../../../../../environments/environment';
import { VariantParserService } from './../../../../core/services/variant-parser.service';


import {UserService } from './../../../../user/services/user.service';
import {InlineEditorComponent} from 'ng2-inline-editor';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss', './rez_Master.scss']
})


export class ProductDetailsComponent implements OnInit {
  @Input() product: Product;
  
  customOptionTypesHash: any;
  currentSelectedOptions = {};
  description: any;
  images: any;
  mainOptions: any;
  correspondingOptions: any;
  variantId: any;

  _checkoutService : CheckoutService;


  currKey: String;

  h002 :string;
  span001 :string;
  hz001 :string;
  ulz001: string;
  ulz002: String;

  constructor(private variantParser: VariantParserService,
              private variantRetriver: VariantRetriverService,
              private checkoutService: CheckoutService,
              private checkoutActions: CheckoutActions,
              private store: Store<AppState>,
              private userService: UserService,
              private translate: TranslateService) {
                this._checkoutService = checkoutService;
                this.loadTxt();  

                
  }

  loadTxt()
  {
    this.translate.get('prodDetails.h002').subscribe((res: string) => {
      this.h002 = res;
    });
    this.translate.get('prodDetails.span001').subscribe((res: string) => {
      this.span001 = res;
    });
    this.translate.get('prodDetails.hz001').subscribe((res: string) => {
      this.hz001 = res;
    });
    this.translate.get('prodDetails.ulz001').subscribe((res: string) => {
      this.ulz001 = res;
    });
    this.translate.get('prodDetails.ulz002').subscribe((res: string) => {
      this.ulz002 = res;
    });
  }

  changeLang(lang: string) {
    this.translate.use(lang);

  }

  ngOnInit() {
    this.description = this.product.description;
    this.images = this.product.master.images;
    this.variantId = this.product.master.id;
    this.customOptionTypesHash = this.variantParser
      .getOptionsToDisplay(this.product.variants, this.product.option_types);
    this.mainOptions = this.makeGlobalOptinTypesHash(this.customOptionTypesHash);
    this.correspondingOptions = this.mainOptions;
  }

  onOptionClick(option) {
    const result = new VariantRetriverService()
                    .getVariant(this.currentSelectedOptions,
                                this.customOptionTypesHash,
                                option, this.product);

    this.createNewCorrespondingOptions(result.newCorrespondingOptions,
                                       option.value.optionValue.option_type_name);

    this.currentSelectedOptions = result.newSelectedoptions;
    const newVariant: Variant = result.variant;
    this.variantId = newVariant.id;
    this.description = newVariant.description;
    this.images = newVariant.images;
  }
  makeGlobalOptinTypesHash(customOptionTypes) {
    const temp = {};
    for (const key in customOptionTypes) {
      if (customOptionTypes.hasOwnProperty(key)) {
        temp[key] = Object.keys(customOptionTypes[key]);
      }
    };
    return temp;
  }
  createNewCorrespondingOptions(newOptions, optionKey) {
    for (const key in this.correspondingOptions) {
      if (this.correspondingOptions.hasOwnProperty(key) && key !== optionKey) {
        this.correspondingOptions[key] = newOptions[key];
      }
    }
  }
  addToCart() {
    this.store.dispatch(this.checkoutActions.addToCart(1)); 
    this.store.dispatch(this.checkoutActions.updateOrder('asdf')); 
  }


  onClick(someValue){
    this.currKey = someValue;
  }
  saveEditable(value) {
     var jsonStr = `
     {
       "page" : "prodDetails",
       "fileName" : "` + this.translate.store.currentLang + `.json", 
       "key" : "` + this.currKey +`",
       "line": "` + value + `"
     }`;

    this.userService.postTxt(jsonStr).subscribe(response => { });
  }
}
