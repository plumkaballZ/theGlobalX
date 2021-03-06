import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { HttpService } from './http';
import { AppState } from '../../interfaces';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../auth/actions/auth.actions';

class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}

@Injectable()
export class AuthService {

  /**
   * Creates an instance of AuthService.
   * @param {HttpService} http
   * @param {AuthActions} actions
   * @param {Store<AppState>} store
   *
   * @memberof AuthService
   */
  constructor(
    private http: HttpService,
    private actions: AuthActions,
    private store: Store<AppState>
  ) {
    http.options
  }
  /**
   *
   *
   * @param {any} data
   * @returns {Observable<any>}
   *
   * @memberof AuthService
   */
  login(data): Observable<any> {

    var _ip = localStorage.getItem('userUid');
    
        if(_ip == null) {
          _ip = Guid.newGuid();
          localStorage.setItem('userUid', _ip);
        }

    data.ip = _ip;

    return this.http.get_Web(
      'api/xUser', { params: data }
    ).map((res: any) => {
      
      var pw = data.password;
      data = res.json();
      data.password = pw;

      if (!data.error) {
        
        this.setTokenInLocalStorage(data);
        this.store.dispatch(this.actions.loginSuccess());

      } else {
        this.http.loading.next({
          loading: false,
          hasError: true,
          hasMsg: data.msg
        });
      }
      return data;
    });
  }

  /**
   
   * @param {any} data
   * @returns {Observable<any>}
   *
   * @memberof AuthService
   */
  register(data): Observable<any> {


    var _ip = localStorage.getItem('userUid');
    
        if(_ip == null) {
          _ip = Guid.newGuid();
          localStorage.setItem('userUid', _ip);
        }

    data.ip = _ip;

    return this.http.post_Web('api/xUser', JSON.stringify({ "glxUser": data })).map((res: Response) => {
      var pw = data.password;
      var resReq = res.json();
      resReq.password = pw;

      if (!resReq.error) {
        this.setTokenInLocalStorage(resReq);
        this.store.dispatch(this.actions.loginSuccess());
      } else {
        this.http.loading.next({
          loading: false,
          hasError: true,
          hasMsg: resReq.mgs
        });
      }

      return resReq;
    });

  }

  /**
   *
   *
   * @returns {Observable<any>}
   *
   * @memberof AuthService
   */
  authorized(): Observable<any> {
    var localUser = JSON.parse(localStorage.getItem('user'));
    
  


    return this.http
      .get_Web(
        'api/xUser', { params: { json: 'asdf', email:(localUser== null ? '': localUser.email), password:(localUser== null ? '': localUser.password) } }
      ).map((res: Response) => 
      {
        var resReq = res.json();
        if(!resReq.error){
          resReq.password = localUser.password;
          this.setTokenInLocalStorage(resReq);
          this.store.dispatch(this.actions.loginSuccess());
          }
        return false;
      });
  }

  /**
   *
   *
   * @returns
   *
   * @memberof AuthService
   */
  logout() {
    return this.http.get('assets/logout.json')
      .map((res: Response) => {
        localStorage.removeItem('user');
        this.store.dispatch(this.actions.logoutSuccess());
        return res.json();
      });
  }

  /**
   *
   *
   * @private
   * @param {any} user_data
   *
   * @memberof AuthService
   */
  private setTokenInLocalStorage(user_data): void {
    const jsonData = JSON.stringify(user_data);
    localStorage.setItem('user', jsonData);
  }
}
