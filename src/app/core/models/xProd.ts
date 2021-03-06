import { OptionType } from './option_type';
import { Classification } from './classification';
import { ProductProperty } from './product_property';
import { Variant } from './variant';

export class xProd {
    id: number;
    name: string;
    description: string;
    price: string;
    price_en: string;
    display_price: string;
    available_on: string;
    slug: string;
    // meta_title: string;             // meta title is present in schema but it is not returned by the spree Api.
    meta_description: string;
    meta_keywords: string;
    shipping_category_id: number;
    taxon_ids: number[];
    total_on_hand: number;
    has_variants: boolean;
    master: Variant;
    variants: Variant[];
    option_types: OptionType[];
    product_properties: ProductProperty[];
    classifications: Classification[];
    liArray: string[];

    public size: string;
    public color: string;
    
    private _bar:boolean = false;
    
    get bar():boolean {
        return this._bar;
    }
    set bar(theBar:boolean) {
        this._bar = theBar;
    }
  }