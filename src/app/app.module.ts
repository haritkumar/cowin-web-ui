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
import { CalendarDistComponent } from './components/calendar-dist/calendar-dist.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    InnerLayoutComponent,
    OpenLayoutComponent,
    NotFoundComponent,
    NavComponent,
    FooterComponent,
    CalendarPinComponent,
    CalendarDistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
