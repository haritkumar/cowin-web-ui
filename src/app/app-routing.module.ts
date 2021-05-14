import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InnerLayoutComponent} from './layout/inner-layout/inner-layout.component';
import {OpenLayoutComponent} from './layout/open-layout/open-layout.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CalendarPinComponent} from './components/calendar-pin/calendar-pin.component';
const routes: Routes = [
  { 
    path: '', 
    component: InnerLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'calendarByPincode', component: CalendarPinComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
    ]
  },
	{ 
        path: '', 
        component: OpenLayoutComponent,
        children: [
          { path: '404', component: NotFoundComponent},
        ]
	},
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
