import { AppState } from './../../../../interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LineItem } from './../../../../core/models/line_item';
import { CheckoutService } from './../../../../core/services/checkout.service';
import { CheckoutActions } from './../../../../checkout/actions/checkout.actions';

import { Variant } from './../../../../core/models/variant';
import { VariantRetriverService } from './../../../../core/services/variant-retriver.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from './../../../../core/models/product';
import { environment } from './../../../../../environments/environment';
import { VariantParserService } from './../../../../core/services/variant-parser.service';
import { inlineTranslatorComp } from './../../../../_custom/inlineTranslatorComp';
import {TranslateService} from '@ngx-translate/core';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
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

  count: any = 1;

  selectedSize: any;
  selectedColor: any;

  pageTranslator: any;

  _checkoutService : CheckoutService;


  constructor(private variantParser: VariantParserService,
              private variantRetriver: VariantRetriverService,
              private checkoutService: CheckoutService,
              private checkoutActions: CheckoutActions,
              private store: Store<AppState>,
              private translate: TranslateService) {
                this._checkoutService = checkoutService;
  }
  ngOnInit() {
    this.description = this.product.description;
    this.images = this.product.master.images;
    this.variantId = this.product.master.id;
    this.customOptionTypesHash = this.variantParser
      .getOptionsToDisplay(this.product.variants, this.product.option_types);
    this.mainOptions = this.makeGlobalOptinTypesHash(this.customOptionTypesHash);
    this.correspondingOptions = this.mainOptions;

    this.translate.get('prodDetails').subscribe((res: any) => {
      this.pageTranslator = res;
    });

    if(this.product.master.option_values != null) {
      if(this.product.master.option_values.length > 0) {

        if(this.product.master.option_values[0].option_type_name == 'Color') {
          this.selectedColor = this.product.master.option_values[0].name;
        }

        if(this.product.master.option_values[0].option_type_name == 'Size') {
          this.selectedSize = this.product.master.option_values[0].name;
        }
      }
    }
  

    $(document).ready(function(){
     
    });	

  }
  
  onOptionClick(option) {
    
     if(option.value.optionValue.option_type_name == 'Color') {
       this.selectedColor = option.value.optionValue.name;
      }

     if(option.value.optionValue.option_type_name == 'Size') {
       this.selectedSize = option.value.optionValue.name;
      }

    const result = new VariantRetriverService()
                    .getVariant(this.currentSelectedOptions,
                                this.customOptionTypesHash,
                                option, this.product);  

    this.createNewCorrespondingOptions(result.newCorrespondingOptions,
                                       option.value.optionValue.option_type_name);

    const newVariant: Variant = result.variant;

    if(newVariant != null)
    {
      if(newVariant.images != null) {
        this.images = newVariant.images;
      }
    }
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

  increseCount() {
    this.count += 1;
  }

  decreaseCount() {
    this.count -= 1;
    if (this.count <= 1) {
      this.count = 1;
    }
  }
  
  addToCart() {

    const variant_id = this.product.master.id;

    this.product.size = this.selectedSize;
    this.product.color = this.selectedColor;
    this.product.total_on_hand = this.count;

    this.store.dispatch(this.checkoutActions.addToCart(this.product));
    
    var _line = new LineItem();
    _line.variant_id = this.product.id;
    _line.single_display_amount = parseInt(this.product.price, 10)
    _line.display_amount = parseInt(this.product.price, 10)
    _line.quantity = this.count;
    _line.color = this.selectedColor;
    _line.size = this.selectedSize;

    this.checkoutService.addLineItem(_line).subscribe();
  }
}
