export class SharedLogics {
    public CurrentCurrency : string;
    
    constructor() {
    }

    public GetCurrentCurrency() : string {
        var localFlag = localStorage.getItem('localFlag');

        if(localFlag == 'gb') return '€'
        
        return "DKK"
    }

    public StringIsNullOrEmpty(s: string) : boolean{
        return StringModule.isNullOrEmpty(s);
    }
    
}

export module StringModule {
    export function isNullOrEmpty(s: string): boolean {
                
        if(s == null) return true;
        if(s == "") return true;

        return false;
    }

}