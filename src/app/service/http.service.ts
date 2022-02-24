import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {}


  fakeApiData() {
    let request$: Observable<any> = new Observable((subscriber) => {
      const response = 
     {"name": "abc",
     "active": true};
        subscriber.next(response);
        subscriber.complete();
    });

    return request$.pipe(
      map((apiResult: HttpResponse<any>) => {
        const responseObject = apiResult;
        return responseObject;
      })
    );
  }
}
