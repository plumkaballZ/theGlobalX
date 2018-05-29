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
  public display_amount: number;
  public variant_id: number;
  public variant: Variant;
  public prod: Product;
  public size : string;
  public color: string;

  public CardHolderX () {
    this.id = 1;
    this.quantity = 1;
    this.price = '300';
    this.single_display_amount = 300;
    this.total = 300;
    this.display_amount = 299;
    this.variant_id = 777;
  } 
  public CardHolderX2 () {
    this.id = 2;
    this.quantity = 2;
    this.price = '400';
    this.single_display_amount = 400;
    this.total = 400;
    this.display_amount = 299;
    this.variant_id = 777;
  } 
}
