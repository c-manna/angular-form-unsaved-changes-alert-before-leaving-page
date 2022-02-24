import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, of, Subject, takeUntil } from 'rxjs';
import { ComponentCanDeactivate } from './guard/un-save-change.guard';
import { HttpService } from './service/http.service';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hello',
  template: `<h1>CanDeactivate Example</h1>
	<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <label>Last Name</label>
      <input type="text" formControlName="firstName" />
	</form>
<a herf="javascript:void(0)" [routerLink]="'/welcome'">Go to WelcomeComponent</a>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent implements OnInit, ComponentCanDeactivate, OnDestroy {
  registerForm!: FormGroup;
  submitted = false;
  private hasUnsavedData = false;
  private unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
    private _httpService: HttpService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
		this.isFormValueChanges();
  }

  get formcontrol() {
		return this.registerForm.controls;
	}


  isFormValueChanges() {
    const form = this.registerForm;
    const initialValue = form.value;
    form.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe((value) => {
      this.hasUnsavedData = Object.keys(initialValue).some(
        (key) => form.value[key] != initialValue[key]
      );
    });
  }

  onSubmit() {}

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

  ngOnDestroy() {
    this.unsubscribe.next();
  }
}
