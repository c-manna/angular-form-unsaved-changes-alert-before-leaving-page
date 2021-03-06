import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { unSaveChangeGuard } from './guard/un-save-change.guard';
import { HttpService } from './service/http.service';
import { ConfirmationService  } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hello',
    pathMatch: 'full'
  },
  {
    path: 'hello',
    component: HelloComponent,
    canDeactivate: [unSaveChangeGuard]
  },{
    path: 'welcome',
    component: WelcomeComponent,
    canDeactivate: [unSaveChangeGuard]
  }
];
@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule,RouterModule.forRoot(routes),HttpClientModule,ConfirmDialogModule,BrowserAnimationsModule],
  providers: [unSaveChangeGuard,HttpService,ConfirmationService],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
