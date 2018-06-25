
export class tranzLat0r {

    private _localFlag : any;

    constructor(page: string){
        this._localFlag = localStorage.getItem('localFlag');
        console.log(this._localFlag);
    }
}