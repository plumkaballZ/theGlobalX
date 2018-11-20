
import { SharedLogics } from './../../shared/shared.Logics';
import { StringModule } from './../../shared/shared.Logics';
import { Address } from '../../core/models/address';

export class AddressLogics extends SharedLogics {

    private overiddenCurrency : string;

    private _addressFormMissingInfo: string;

    constructor() {
        super();
    }

    public GetAddressMissingInfo(): string{ 
        return this._addressFormMissingInfo;
    }

    public CheckIfAddressFormIsValid(addr: any): boolean {
        

        if(StringModule.isNullOrEmpty(addr.address_1)) {
            this._addressFormMissingInfo = "Address is missing";
            return false;
        }
        if(StringModule.isNullOrEmpty(addr.zipcode)) {
            this._addressFormMissingInfo = "Zipcode is missing";
            return false;
        }
        
        if(StringModule.isNullOrEmpty(addr.country_id)) {
            this._addressFormMissingInfo = "Please select a country";
            return false;
        }
        
        return true;
    }

    public ProcessAndGetDeliveryOptions(data: any) : any[]{
        
        var deliveryOptinsResult: any[] = [];
        var sortedData;

        for(var countryKey in data) sortedData = data[countryKey];

        for(var key in sortedData) {
            var obj = sortedData[key];

            if(this.CheckIfDeliveryOptionsIsValid(obj)) {
                
                for (var i = 0; i <  obj.products.length; i++) {
                    
                    var price = obj.rates[0].price;
                    var rate =  obj.rates.filter(x => x.specific_shipping_product == obj.products[i].id)[0];
                    
                    if(rate != null) price = rate.price;
                    
                    if(this.CheckIfProductIsValid(obj.products[i])){
                        deliveryOptinsResult.push(this.CreateNewDeliveryOptions(obj.name + ' ' + obj.products[i].name, price, '1-3 days', price));
                    }
              }
            }
          }
          return deliveryOptinsResult;
    }



    public OverrideCurrentCurrency(currency) : boolean {
        this.overiddenCurrency = currency;
        return true
    }
    public CurrentCurrencyIsOverridden() : boolean{
        return !StringModule.isNullOrEmpty(this.overiddenCurrency);
    }
    public CreateNewDeliveryOptions(name: string, displayPrice: string, 
        deliverySpeed: string, price: number): any{
            
            var currencyToUse = (this.CurrentCurrencyIsOverridden()) ? this.overiddenCurrency : this.GetCurrentCurrency();

            return {
            "prop1": name,
            "prop2": displayPrice + " " + currencyToUse,
            "prop3" : deliverySpeed,
            "prop4" : price
            };
    }

    public CheckIfProductIsValid(prod: any) : boolean{
        if(prod.name == "Return Drop Off") return false
        if(prod.name == "GLS ShopReturnService") return false
        return true
    }
    public CheckIfDeliveryOptionsIsValid(obj: any) : boolean {
        var price = obj.rates[0].price;
        
        if(obj.code == 'unspecified') return false;
        if(price == 99999) return false;

        return true;
    }

}

