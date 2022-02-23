import { Component, Input } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { ComponentCanDeactivate } from './guard/un-save-change.guard';
import { HttpService } from './service/http.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1><a [routerLink]="'/welcome'">Go to WelcomeComponent</a>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements ComponentCanDeactivate  {
  @Input() name: string;

  constructor(private _httpService:HttpService){}
  private hasUnsavedData = false;

  canDeactivate(): Observable<boolean> | boolean {
		if (this.hasUnsavedData) {
			return new Observable((observer: Observer<boolean>) => {
				this._confirmationService.confirm({
					message:
						'You have unsaved changes. Do you want to save and leave this page? ',
					accept: () => {
						this.saveChanges().subscribe({
							next: (apiResult) => {
								observer.next(true);
								observer.complete();
							},
							error: (apiError) => {
								observer.next(false);
								observer.complete();
							}
						});
					},
					reject: () => {
						observer.next(false);
						observer.complete();
					}
				});
			});
		} else {
			return of(true);
		}
	}

  saveChanges() {
		return new Observable((observer: Observer<boolean>) => {
			this._httpService
				.fakeApiData(	)
				.subscribe({
					next: (apiResult) => {
						observer.next(true);
						observer.complete();
					},
					error: (apiError) => {
						observer.next(false);
						observer.complete();
					}
				});
		});
	}


}
