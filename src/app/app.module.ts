import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from '../views/shell/shell.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { GlobalState } from './store_xs/store.state';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShellComponent,
    NgxsModule.forRoot([GlobalState]),
    ButtonModule,
    BrowserAnimationsModule,
  ],
  providers: [provideHttpClient()],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
