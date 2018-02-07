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

  constructor(private variantParser: VariantParserService,
              private variantRetriver: VariantRetriverService,
              private checkoutService: CheckoutService,
              private checkoutActions: CheckoutActions,
              private store: Store<AppState>) {
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
}
