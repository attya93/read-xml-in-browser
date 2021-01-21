import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReadComponent } from './components/read/read.component';
import { HttpClientModule } from '@angular/common/http';
import { Page404Component } from './components/page404/page404.component'

@NgModule({
  declarations: [
    AppComponent,
    ReadComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
  ngOnInit() {
    localStorage.removeItem("intro")
  }
}
