import { Component, OnInit } from '@angular/core';
import { UserActions } from './actions/user.actions';
import { UserService } from './services/user.service';
import { User } from '../core/models/user';

import { AppState } from './../interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  User: User;
  userId: string;

  private data: Observable<User>;

  constructor(
    private userService: UserService,
    private userAction: UserActions,
    private store: Store<AppState>
  ) {
    this.User = JSON.parse(localStorage.getItem('user'));
    this.userService._user = this.User;
  }
  ngOnInit() {
  }
  updateId(e: any) {
    this.User.id = this.userId;   
    this.userService._user = this.User;
    this.store.dispatch(this.userAction.updateUser(this.User));
  }
}
