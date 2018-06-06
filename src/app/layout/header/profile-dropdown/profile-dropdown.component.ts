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

  public langZ: string;

  public bag: string;
  public chooseLang: string;
  public english:string;
  public danish: string;

  pageTranslator: any;

  constructor(
    private authService: AuthService, private translate: TranslateService
  ) { }

  ngOnInit() {
    this.langZ = localStorage.getItem('localLang');
    if(this.langZ == null) this.langZ = 'en';

    this.translate.get('profile').subscribe((res: any) => {
      this.pageTranslator = res;
    });
    
  }

  logout() {
    this.authService.logout().subscribe(
      data => console.log(data)
    );
  }
  changeLang(lang: string)
  {
    localStorage.setItem('localLang', lang);
    location.reload();
  }
}
