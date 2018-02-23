import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  @Input() isAuthenticated: boolean;
  @Input() totalCartItems: number;


  public da_selected: boolean;
  public en_selected: boolean;

  constructor(
    private authService: AuthService, private translate: TranslateService
  ) {    
   }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(
      data => console.log(data)
    );
  }
  changeLang(lang: string)
  {
    if(lang == 'en') {
      this.en_selected = true;
      this.da_selected = false;
    }
    else{
      this.da_selected = true;
      this.en_selected = false;
    }

    localStorage.setItem('localLang', lang);
    location.reload();
  }
}
