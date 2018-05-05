import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { TranslateLoader } from '@ngx-translate/core';
import { HttpService } from './../core/services/http';
import {Observable} from 'rxjs/Observable'; 
 
@Injectable()
export class CustomTranslateLoader implements TranslateLoader  {
    constructor(private http: HttpService) {
    }
    getTranslation(lang: string): Observable<any>{
        return Observable.create(observer => {
            this.http.get_Web('api/xTxt', {params: {fileName: lang + '.json'}}).subscribe((res: Response) => {
                observer.next(res.json());
                observer.complete();
            },
            error => {
                this.http.get("/assets/i18n/en.json").subscribe((res: Response) => {
                    observer.next(res.json());
                    observer.complete();               
                })
            }
            );
        }); 
    }
    
}

