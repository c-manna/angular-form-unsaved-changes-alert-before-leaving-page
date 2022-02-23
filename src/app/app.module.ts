import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WelcomeComponent } from './welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { unSaveChangeGuard } from './guard/un-save-change.guard';

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
  imports:      [ BrowserModule, FormsModule,RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
