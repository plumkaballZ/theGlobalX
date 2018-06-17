import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'cookiePolicyComp',
    templateUrl: './cookiePolicy.html',
    styleUrls: ['./cookiePolicy.css']
})

export class cookiePolicyComp implements OnInit {

    tranz: any = {};
    
    constructor(private translate: TranslateService){
        this.translate.get('cookiePolicy').subscribe((res: any) => {
            this.tranz = res;
        });
    }
    ngOnInit() {
    }
}