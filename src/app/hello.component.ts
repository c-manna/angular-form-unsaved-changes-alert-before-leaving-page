import { Component, Input } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { ComponentCanDeactivate } from './guard/un-save-change.guard';
import { HttpService } from './service/http.service';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hello',
  template: `<h1>CanDeactivate Example</h1>
	
	<a [routerLink]="'/welcome'">Go to WelcomeComponent</a>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent implements ComponentCanDeactivate {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _httpService: HttpService
  ) {
  }
  ngOnInIt() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: [ '', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }
  private hasUnsavedData = false;

  canDeactivate(): Observable<boolean> | boolean {
    if (this.hasUnsavedData) {
      return new Observable((observer: Observer<boolean>) => {
        this._confirmationService.confirm({
          message:
            'You have unsaved changes. Do you want to save and leave this page? ',
          accept: () => {
            this.isChanges().subscribe({
              next: (apiResult) => {
                observer.next(true);
                observer.complete();
              },
              error: (apiError) => {
                observer.next(false);
                observer.complete();
              },
            });
          },
          reject: () => {
            observer.next(false);
            observer.complete();
          },
        });
      });
    } else {
      return of(true);
    }
  }

  isChanges() {
    return new Observable((observer: Observer<boolean>) => {
      this._httpService.fakeApiData().subscribe({
        next: (apiResult) => {
          observer.next(true);
          observer.complete();
        },
        error: (apiError) => {
          observer.next(false);
          observer.complete();
        },
      });
    });
  }
}
