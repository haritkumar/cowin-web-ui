import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InnerLayoutComponent } from './layout/inner-layout/inner-layout.component';
import { OpenLayoutComponent } from './layout/open-layout/open-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CalendarPinComponent } from './components/calendar-pin/calendar-pin.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InnerLayoutComponent,
    OpenLayoutComponent,
    NotFoundComponent,
    NavComponent,
    FooterComponent,
    CalendarPinComponent
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
export class AppModule { }
