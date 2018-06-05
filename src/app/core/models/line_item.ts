import { Variant } from './variant';
import { Product } from './../../core/models/product';
/*
 * LineItem model
 * Detailed info http://guides.spreecommerce.org/developer/orders.html#line-items
 * Public API's http://guides.spreecommerce.org/api/line_items.html
 */

export class LineItem {
  public id: number;
  public quantity: number;
  public price: string;
  public single_display_amount: number;
  public total: number;
  public _total: number;
  public display_amount: number;
  public variant_id: number;
  public variant: Variant;
  public prod: Product;
  public size : string;
  public color: string;
  public delStr : string;

  constructor(){
  }
}
