import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InnerLayoutComponent} from './layout/inner-layout/inner-layout.component';
import {OpenLayoutComponent} from './layout/open-layout/open-layout.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {CalendarPinComponent} from './components/calendar-pin/calendar-pin.component';
import {CalendarDistComponent} from './components/calendar-dist/calendar-dist.component';
const routes: Routes = [
  { 
    path: '', 
    component: InnerLayoutComponent,
    children: [
      { path: 'calendarByPincode', component: CalendarPinComponent},
      { path: 'calendarByDistrict', component: CalendarDistComponent},
      { path: '', redirectTo: 'calendarByPincode', pathMatch: 'full'},
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
