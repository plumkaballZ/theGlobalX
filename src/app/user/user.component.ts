import { Component, OnInit } from '@angular/core';

import { UserService } from './services/user.service';
import { User } from '../core/models/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  User: User;
  userId: string;

  constructor(
    private userService: UserService
  ) 
  {
    this.User = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  updateId(e: any) {
    this.User.id = this.userId;
    // this.userService.updateUser(this.User);
  }
}
