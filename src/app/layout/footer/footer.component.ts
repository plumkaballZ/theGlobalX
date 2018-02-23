import { Component, OnInit } from '@angular/core';

import {UserService } from './../../user/services/user.service';
import {InlineEditorComponent} from 'ng2-inline-editor';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss', './rez_Master.scss']
})
export class FooterComponent implements OnInit {

  editorDisabled: boolean = true;
  currKey: string;

  about001: string;
  about002: string;

  constructor(private userService: UserService, private translate: TranslateService) { 
    this.loadTxt();
  }

  ngOnInit() {
  }

  loadTxt()
  {
    var localUser = JSON.parse(localStorage.getItem('user'));
    if(localUser != null) if(localUser.lvl == 99)this.editorDisabled = false;

    this.translate.get('footer.about001').subscribe((res: string) => {
       this.about001 = res;
     });

     this.translate.get('footer.about002').subscribe((res: string) => {
      this.about002 = res;
    });
  }
  onClick(someValue){
    this.currKey = someValue;
  }
  saveEditable(value) {

     var jsonStr = `
     {
       "page" : "footer",
       "fileName" : "` + this.translate.store.currentLang + `.json", 
       "key" : "` + this.currKey +`",
       "line": "` + value + `"
     }`;

    this.userService.postTxt(jsonStr).subscribe(response => { });
  }

}
