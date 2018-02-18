import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HttpService extends Http {
  public loading = new Subject<{loading: boolean, hasError: boolean, hasMsg: string}>();

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
  ) {
    super(backend, defaultOptions);
  }
  
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }


  get_Web(url: string, options?: RequestOptionsArgs): Observable<any> {
    
    this.requestInterceptor();

    return super.get(this.getFullUrl_Web(url), this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  getLocal(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super.get(url, options);
  }

   post_Web(url: string, body: any, options?: RequestOptionsArgs, useWebUrl?:boolean): Observable<any> {
    
    this.requestInterceptor();

    return super.post(this.getFullUrl_Web(url), body, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    
    this.requestInterceptor();

    var _url = this.getFullUrl(url);

    return super.post(_url, body, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }
  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.requestInterceptor();
    return super.delete(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch.bind(this))
      .do((res: Response) => {
        this.onSubscribeSuccess(res);
      }, (error: any) => {
        this.onSubscribeError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      const user = localStorage.getItem('user') != "undefined" ? JSON.parse(localStorage.getItem('user')) : null;
      
      options.headers = new Headers({
        'Content-Type': 'application/json',
        'X-Spree-Token': user && user.spree_api_key
      });
    }
    return options;
  }
  private getFullUrl(url: string): string {
    return environment.API_ENDPOINT + url;
  }
   private getFullUrl_Web(url: string): string {
    return environment.WEB_ENDPOINT + url;
  }
  private requestInterceptor(): void {

    // this.loaderService.showPreloader();
    this.loading.next({
      loading: true, hasError: false, hasMsg: ''
    });
  }

  private responseInterceptor(): void {

    // this.loaderService.hidePreloader();
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
  
    // this.loaderService.popError();
    return Observable.of(error);
  }

  private onSubscribeSuccess(res: Response): void {
    this.loading.next({
      loading: false, hasError: false, hasMsg: ''
    });
  }

  private onSubscribeError(error: any): void {
  
    // this.loaderService.popError();
    this.loading.next({
      loading: false, hasError: true, hasMsg: 'Something went wrong'
    });
  }

  private onFinally(): void {
    this.responseInterceptor();
  }
}
