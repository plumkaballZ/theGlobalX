import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'lang-comp',
  templateUrl: './langComp.html',
  styleUrls: ['./langComp.scss']
})

export class langComp implements OnInit {
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
      console.log('langOnInit();');
  }
}
