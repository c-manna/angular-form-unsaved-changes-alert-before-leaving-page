import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { unSaveChangeGuard } from './guard/un-save-change.guard';
import { HttpService } from './service/http.service';
import { ConfirmationService  } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';

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
  imports:      [ BrowserModule, FormsModule,RouterModule.forRoot(routes),HttpClientModule],
  providers: [unSaveChangeGuard,HttpService,ConfirmationService],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
