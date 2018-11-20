export class SharedLogics {
    public CurrentCurrency : string;
    
    constructor() {
    }

    public GetCurrentCurrency() : string {
        var localFlag = localStorage.getItem('localFlag');

        if(localFlag == 'gb') return '€'
        
        return "DKK"
    }
    
}

export module StringModule {
    export function isNullOrEmpty(s: string): boolean {
        return !s;
    }
}