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


import { UserService } from './../../../../user/services/user.service';
import {InlineEditorComponent} from 'ng2-inline-editor';


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


  h002 :String = "";
  span001 :String = '';

  constructor(private variantParser: VariantParserService,
              private variantRetriver: VariantRetriverService,
              private checkoutService: CheckoutService,
              private checkoutActions: CheckoutActions,
              private store: Store<AppState>,
              private userService: UserService) {
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

    console.log(this.h002);

    this.userService.getTxt('prodDetails.txt').subscribe(response => {
      for (var i = 0; i < response.length; i++) {

        var rawText = response[i];

        var key =  rawText.substring(rawText.lastIndexOf("[") + 1, rawText.lastIndexOf(":"));
        var line = rawText.substring(rawText.lastIndexOf(":") + 1, rawText.lastIndexOf("]"));

 
        if(key == 'span001') this.span001 = line;
        if(key == 'h002') this.h002 = line;
      }
    });

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

  saveEditable_h002(value) {
    var jsonStr = `
    {
      "fileName" : "prodDetails.txt", 
      "rawStr" : "[h002:` + value + `]"
    }`;
    this.userService.postTxt(jsonStr).subscribe(response => {
    });
  }
  saveEditable_span001(value) {
    var jsonStr = `
    {
      "fileName" : "prodDetails.txt", 
      "rawStr" : "[span001:` + value + `]"
    }`;
    this.userService.postTxt(jsonStr).subscribe(response => {
    });
  }
}
