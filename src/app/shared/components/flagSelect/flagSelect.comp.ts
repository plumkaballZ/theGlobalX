import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'flagSelectComp',
    templateUrl:'./flagSelect.html',
    styleUrls:['./flagSelect.scss']
})

export class flagSelectComp implements OnInit {
    @Input() FlagsArray;
    public _localFlag: string;
    public _flagsArray: any;

    constructor() { }

    ngOnInit() {
        this._localFlag = 'dk';
        var localFlag = localStorage.getItem('localFlag');

        if(localFlag) this._localFlag = localFlag;

        this._flagsArray = [];
        
        this.FlagsArray.forEach(element => {
            this._flagsArray.push({lang: element, checked: ((element == localFlag) ? true : false)}) 
        });
    }
    saveFlag(flag : string) {
        this._flagsArray.forEach(element => {
            if(element.lang != flag) element.checked = false;
        });
        
        if(this._localFlag != flag){
            setTimeout(()=> {
                localStorage.setItem('localFlag', flag);
                location.reload();
            }, 500);
        }
    }
}