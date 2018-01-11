import { Component, OnInit } from '@angular/core';

declare let paypal: any;

@Component({
    selector: 'PayPalComp',
    templateUrl: './paypal.html',
    styleUrls: ['./paypal.scss']
})

export class PayPalComp implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
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
                  amount: { total: '1.00', currency: 'USD' }
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
