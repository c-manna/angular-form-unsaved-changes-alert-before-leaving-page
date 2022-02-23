import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {}


  fakeApiData() {
    let request$: Observable<any> = new Observable((subscriber) => {
      const response = JSON.parse(`
     "name": "abc",
     "active": true,
     ...all other json fields that you want
     `);
      setTimeout(() => {
        subscriber.next(response);
        subscriber.complete();
      }, 3000);
    });

    return request$.pipe(
      map((apiResult: HttpResponse<any>) => {
        const responseObject = apiResult.body;
        return responseObject;
      })
    );
  }
}
