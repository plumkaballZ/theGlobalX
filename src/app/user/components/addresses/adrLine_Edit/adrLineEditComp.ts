import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../interfaces';
import { UserActions } from '../../../actions/user.actions';
import { UserService } from '../../../services/user.service';
import { Address } from '../../../../core/models/address';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'adrLineEditComp',
  templateUrl: './adrLineEdit.html',
  styleUrls: ['./adrLineEdit.scss']
})

export class AdrLineEditComp implements OnInit, OnDestroy {

  routeSubscription$: Subscription;
  orderSubscription$: Subscription;
  adrId: String;
  adr: Address;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) 
  {

  }
  
  ngOnInit() {
    this.routeSubscription$ = this.route.params.subscribe(
      (params: any) => 
      {
        this.adrId = params['id'];
        this.orderSubscription$ =
        this.userService.getAddr(this.adrId).subscribe(adr => this.adr = adr);}
    );
  }

  ngOnDestroy() {
    this.routeSubscription$.unsubscribe();
    this.orderSubscription$.unsubscribe();
  }

}
