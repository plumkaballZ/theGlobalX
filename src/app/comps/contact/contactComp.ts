import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserService } from './../../user/services/user.service';

@Component({
  selector: 'contactComp',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})

export class ContactComp implements OnInit {
  yName: string;
  yEmail: string;
  ySubject: string;
  yDesc: string;

  constructor(
    private translate: TranslateService
  ) { 
  }
  ngOnInit() {
     this.translate.get('contact.yName').subscribe((res: string) => {
       this.yName = res;
     });
     this.translate.get('contact.yEmail').subscribe((res: string) => {
       this.yEmail = res;
     });

     this.translate.get('contact.ySubject').subscribe((res: string) => {
       this.ySubject = res;
     });
     this.translate.get('contact.yDesc').subscribe((res: string) => {
       this.yDesc = res;
     });
  }
}