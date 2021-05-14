import { Component, OnInit } from '@angular/core';
import {CowinService} from '../../service/cowin.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-calendar-pin',
  templateUrl: './calendar-pin.component.html'
})
export class CalendarPinComponent implements OnInit {

  dates: string[] = [];
  dataCalendar: any = {};
  secondsCounter = interval(5000);
  constructor(private cowinService: CowinService) { 
    this.getDates();
    this.secondsCounter.subscribe(n =>{
      this.getData();
     });
  }

  getDates(): void{
    let c_date = new Date();
    this.dates.push(c_date.getDate()+"-"+("0" + (c_date.getMonth()+1)).slice(-2)+"-"+c_date.getFullYear())
    for(var i=1; i<7; i++){
      let newDate = new Date(c_date.getFullYear(), c_date.getMonth(), c_date.getDate()+i);
      this.dates.push(newDate.getDate()+"-"+("0" + (newDate.getMonth()+1)).slice(-2)+"-"+newDate.getFullYear());
    }
  }

  getData(): void{
    this.cowinService.getCalendarByPin(110095, '14-5-2021')
      .subscribe((data:any) => {
        console.log(data);
        this.dataCalendar = data;
        this.mapData();
      });
  }



  mapData(): void{
    let _this = this;
    _this.dates.forEach(function (d1) {
      _this.dataCalendar.centers.forEach(function (d2) {
        d2.sessions.forEach(function (d3) {
          console.log(d3.date+"-"+d1);
        }); 
      }); 
    }); 
  }



  ngOnInit(): void {
    this.getData();
  }

}
