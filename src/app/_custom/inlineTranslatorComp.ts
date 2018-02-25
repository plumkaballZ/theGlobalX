import { Component, OnInit, Input } from '@angular/core';

import {UserService } from './../user/services/user.service';
import {InlineEditorComponent} from 'ng2-inline-editor';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'inline-translator',
  templateUrl: './inlineTranslator.html',
  styleUrls: ['./inlineTranslator.scss']
})

export class inlineTranslatorComp implements OnInit {

    public editorDisabled: boolean = true;
    @Input() page: string;
    @Input() key: string;
    @Input() elementType: string;

    public line: string;
    
    constructor(private userService: UserService, private translate: TranslateService) {  
    }
    ngOnInit() {
      this.loadTxt(); 
    }
    loadTxt()
    {
        var localUser = JSON.parse(localStorage.getItem('user'));

        if(localUser != null) 
          if(localUser.lvl == 99)this.editorDisabled = false;

          var searchStr = this.page + '.' + this.key;
          
          this.translate.get(searchStr).subscribe((res: string) => {
             this.line = res;
         });
    }
  saveEditable(value) {
     var jsonStr = `
     {
       "page" : "`+ this.page +`",
       "fileName" : "` + this.translate.store.currentLang + `.json", 
       "key" : "` + this.key +`",
       "line": "` + value + `"
     }`;
    this.userService.postTxt(jsonStr).subscribe(response => {
     });
  }
}
