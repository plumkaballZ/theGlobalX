import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from './../..../../../interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getTotalCartValue, getTotalCartItems } from './../../checkout/reducers/selectors';
import { CheckoutService } from './../../core/services/checkout.service';
import {TranslateService} from '@ngx-translate/core';

declare var jquery:any;
declare var $ :any;
declare let paypal: any;

@Component({
    selector: 'PayPalComp',
    templateUrl: './paypal.html',
    styleUrls: ['./paypal.scss']
})

export class PayPalComp implements OnInit {
  @Input() totalCartValue: number;
  @Input() totalCartItems: number;

  @Output() payOnDelivery: EventEmitter<boolean> = new EventEmitter<boolean>();

  tranz: any;

    constructor(private checkoutService: CheckoutService, private store: Store<AppState>,  private translate: TranslateService) {
    }

    ngOnInit() {
      this.translate.get('payPal').subscribe((res: any) => {
        this.tranz = res;
      });
    }
    ngAfterViewInit(): void {
      
      var totalValue = this.totalCartValue;
      var currency = this.tranz.currency;
      var eventEmitter = this.payOnDelivery;
      
        this.loadExternalScript("https://www.paypalobjects.com/api/checkout.js").then(() => {
          paypal.Button.render({
            env: 'production',
            funding: {
              allowed: [ 
                paypal.FUNDING.CARD
              ],
              disAllowed : [
                paypal.FUNDING.CREDIT
              ]
          },
            style: {
              size: 'large',
              label: 'checkout',
              color: 'gold',
              fundingicons : true
            },
                 client: {
                    sandbox:    'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL',
                    production: 'Ae5kKArd7iUNkdxJRr6uGU9v7H0Q0BSKn6V5uaiGgv1j-Np3k4OAD3TvxNXZU1WnuZEHZrzd7xjV6gDk'
                },
                commit: true,
                payment: function (data, actions) {return actions.payment.create({
                  payment: {
                    transactions: [
                      {
                        amount: { total: totalValue, currency: currency }
                      }
                    ],
                    
                  }
          })
        },
        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
            eventEmitter.emit(true);
          })
        },
        onCancel: function(data, actions) {
        }
      }, '#paypalBtn');
    })
  }

  private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)});
    }}
