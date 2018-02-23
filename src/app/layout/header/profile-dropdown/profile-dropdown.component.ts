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

  constructor(
    private authService: AuthService, private translate: TranslateService
  ) { }
  
  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(
      data => console.log(data)
    );
  }
  changeLang()
  {
    localStorage.setItem('localLang', 'en');
    location.reload();
  }
}
