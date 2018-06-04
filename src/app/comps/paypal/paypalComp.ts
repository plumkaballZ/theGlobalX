import { Component, OnInit, Input } from '@angular/core';
import { AppState } from './../..../../../interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getTotalCartValue, getTotalCartItems } from './../../checkout/reducers/selectors';
import { CheckoutService } from './../../core/services/checkout.service';

declare let paypal: any;

@Component({
    selector: 'PayPalComp',
    templateUrl: './paypal.html',
    styleUrls: ['./paypal.scss']
})

export class PayPalComp implements OnInit {
  @Input() totalCartValue: number;
  @Input() totalCartItems: number;

    constructor(private checkoutService: CheckoutService, private store: Store<AppState>) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
      var totalValue = this.totalCartValue;

        this.loadExternalScript("https://www.paypalobjects.com/api/checkout.js").then(() => {
          paypal.Button.render({
            env: 'sandbox',
                 client: {
                    sandbox:    'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL',
                    production: '<1>'
                },
                commit: true,
                payment: function (data, actions) {return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: totalValue, currency: 'USD' }
                }
              ]
            }
          })
        },
        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(payment) {
          })
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
