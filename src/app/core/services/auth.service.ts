import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { HttpService } from './http';
import { AppState } from '../../interfaces';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../auth/actions/auth.actions';

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

    console.log(data);
    
    return this.http.get_Web(
      'api/xUser',  JSON.stringify({ 'email': 'asdf', 'password':'asdf' })
    ).map((res: Response) => {
      data = res.json();
      if (!data.error) {
        
        this.setTokenInLocalStorage(data);
        this.store.dispatch(this.actions.loginSuccess());

      } else {
        this.http.loading.next({
          loading: false,
          hasError: true,
          hasMsg: 'Please enter valid Credentials'
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
    
    return this.http.post_Web('api/xUser', JSON.stringify({ "glxUser": data })).map((res: Response) => {

      data = res.json();

      console.log('res:');
      console.log(res.json());

      if (!data.errors) {
        this.setTokenInLocalStorage(res.json());
        this.store.dispatch(this.actions.loginSuccess());
      } else {
        this.http.loading.next({
          loading: false,
          hasError: true,
          hasMsg: 'Please enter valid Credentials'
        });
      }
      return res.json();
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
    return this.http
      .get('/assets/api/users/users.json')
      .map((res: Response) => {console.log('res'); console.log(res.json()); return res.json()});
  }

  /**
   *
   *
   * @returns
   *
   * @memberof AuthService
   */
  logout() {
    return this.http.get('spree/logout.json')
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
    console.log('setTokenInStorage');
    const jsonData = JSON.stringify(user_data);
    localStorage.setItem('user', jsonData);
  }
}
