import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ShellComponent} from "../views/shell/shell.component";
import {StoreModule} from '@ngrx/store';
import {appReducers} from "./store/app.reducers";
import {RunViewComponent} from '../components/run-view/run-view.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShellComponent,
    StoreModule.forRoot({app: appReducers}),
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
