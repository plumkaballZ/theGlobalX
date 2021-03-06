import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http';
import { UserActions } from '../actions/user.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces';
import { Order } from '../../core/models/order';
import { Response } from '@angular/http';
import { User } from '../../core/models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  public _user : User;

  constructor(
    private http: HttpService,
    private actions: UserActions,
    private store: Store<AppState>
  ) { }

  /**
   *
   *
   * @returns {Observable<Order[]>}
   *
   * @memberof UserService
   */
  getOrders(): Observable<Order[]> {
    
    var localUser = JSON.parse(localStorage.getItem('user'));

    var orderUrl = 'api/xOrders';

    if(localUser.lvl == 99) orderUrl = 'api/xOrders/GetOrdersLvl99'

    return this.http.get_Web(orderUrl, {params: {email: (localUser== null ? '': localUser.email), ip : localStorage.getItem('userUid')}})
      .map((res: Response) =>  {
        return res.json();
      });
  }
  /**
   *
   *
   * @param {any} orderNumber
   * @returns {Observable<Order>}
   *
   * @memberof UserService
   */
  getOrderDetail(orderNumber): Observable<Order> {
    var localUser = JSON.parse(localStorage.getItem('user'));
    return this.http.get_Web('api/xOrders/GetOrderDetail', 
    {params: {email: (localUser== null ? '': localUser.email), orderNumber: orderNumber}})
      .map((res: Response) =>  {
        return res.json();
      });
  }
  /**
   *
   *
   * @returns {Observable<User>}
   *
   * @memberof UserService
   */
  getUser(): Observable<User> {
    const user_id = JSON.parse(localStorage.getItem('user')).id;
    return this.http.get(`/assets/api/users/users.json`)
      .map(res => res.json());
  }
  getAddrs(email: string)
  {
    return this.http.get_Web('api/xAddresses', {params: {email: email}})
      .map((res: Response) =>  {
        return res.json();
      });
  }
  getAddr(adrId)
  {
    return this.http.get_Web('api/xAddress', {params: { id: adrId }}).map((res: Response) =>  {return res.json();});
  }
  updateUser(params) {
    return this.http.post_Web('api/xUser/UpdateUser', JSON.stringify({
      "xUser" : this._user, 
    })).map((res: Response) =>  {
      const order = res.json();
    });
  }
  getTxt(fileName: string){
    return this.http.get_Web('api/xTxt', {params: {fileName: fileName}}).map((res: Response) =>  {
      var txtRes = res.json();
      return txtRes;
    });
  }
  postTxt(jsonStr : string){
    return this.http.post_Web('api/xTxt', JSON.stringify({"jsonStr" : jsonStr})).map((res: Response) =>  { return true;});
  }
}