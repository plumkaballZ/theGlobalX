import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {UserService } from './../../user/services/user.service';

@Component({
  selector: 'contactComp',
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss', './contact.styl']
})

export class ContactComp implements OnInit {
  yName: string;
  yEmail: string;
  ySubject: string;
  yDesc: string;

  mailSent : boolean;
  tranz : any;

  constructor(
    private translate: TranslateService
  ) { 
    this.mailSent = false;
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
     this.translate.get('contact').subscribe((res: string) => {
      this.tranz = res;
    });
  }
  
  sendEmail_click(){
    this.mailSent = true;
  }
}