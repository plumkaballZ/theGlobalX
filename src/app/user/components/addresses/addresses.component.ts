import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../../../interfaces';
import { UserActions } from '../../actions/user.actions';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Address } from '../../../core/models/address';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  
  actionsSubscription: Subscription;
  addrs$: Observable<Address[]>;

  constructor(
    private store: Store<AppState>, 
    private userActions: UserActions,
    private userService: UserService,
    private route: ActivatedRoute
  ) 
  {
    this.actionsSubscription = this.route.params.subscribe(
      (params: any) => {
        this.userService
          .getAddrs( JSON.parse(localStorage.getItem('user')) == null ? "" : JSON.parse(localStorage.getItem('user')).email)
          .subscribe(response => this.addrs$ = response);
        }

    );
  }
  ngOnInit() {
  }
}
