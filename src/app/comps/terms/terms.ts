import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'termsComp',
    templateUrl: './terms.html',
    styleUrls: ['./terms.css']
})

export class termsComp implements OnInit {

    tranz: any = {};
    
    constructor(private translate: TranslateService){
        this.translate.get('terms').subscribe((res: any) => {
            this.tranz = res;
        });
    }
    ngOnInit() {
    }
}