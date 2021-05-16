import { Component, OnInit } from '@angular/core';
import {CowinService} from '../../service/cowin.service';
import { interval } from 'rxjs';
import {DateServiceService} from '../../service/date-service.service';

@Component({
  selector: 'app-calendar-pin',
  templateUrl: './calendar-pin.component.html'
})
export class CalendarPinComponent implements OnInit {

  dates: string[] = [];
  dataCalendar: any = {};
  secondsCounter = interval(5000);
  tableData: any[] = [];
  pincode: number = 110095;
  date: string = this.dateServiceService.getTodayDate();
  dateS: string = this.dateServiceService.getTodayDateFormat();
  isChecked18Plus: boolean = false;
  apiStatus: string = 'cg';

  constructor(private cowinService: CowinService, private dateServiceService: DateServiceService) { 
    this.getDates();
    this.secondsCounter.subscribe(n =>{
      this.getData();
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void{
    this.cowinService.getCalendarByPin(this.pincode, this.dateS)
      .subscribe((data:any) => {
        this.apiStatus = 'cg';
        this.dataCalendar = data;
        this.setData();
      },
      error => {
        this.apiStatus = 'cr';
        this.tableData= [];
      });
  }

  setData(): void{
    //console.log("Set Data");
    let _this = this;
    _this.tableData= [];
    this.dataCalendar.centers.forEach(function (center) {
      center.sessions.forEach(function (session) {
        //console.log(_this.isChecked18Plus);
        if(_this.isChecked18Plus){//Only 18+
          if(session.min_age_limit === 18){
            session["fee_type"] = center.fee_type;
            session["pincode"] = center.pincode;
            session["name"] = center.name;
            session["address"] = center.address;
            session["center_id"] = center.center_id;
            _this.tableData.push(session);
          }
        }else{
            session["fee_type"] = center.fee_type;
            session["pincode"] = center.pincode;
            session["name"] = center.name;
            session["address"] = center.address;
            session["center_id"] = center.center_id;
            _this.tableData.push(session);
        }
      });
    });
  
  }

  getCSSClass(capacity) {
    if(capacity === 0){
      return { bg: "bg-r" };
    }else if(capacity > 0 && capacity <= 25){
      return { bg: "bg-y" };
    }else{
      return  { bg: "bg-g" }
    }
  }
  

  getDates(): void{
    let c_date = new Date();
    this.dates.push(c_date.getDate()+"-"+("0" + (c_date.getMonth()+1)).slice(-2)+"-"+c_date.getFullYear())
    for(var i=1; i<7; i++){
      let newDate = new Date(c_date.getFullYear(), c_date.getMonth(), c_date.getDate()+i);
      this.dates.push(newDate.getDate()+"-"+("0" + (newDate.getMonth()+1)).slice(-2)+"-"+newDate.getFullYear());
    }
  }

  updatePincode(pin, date): void{
    //console.log("updating pincode to : "+pin);
    //console.log("updating date to : "+date);
    var parts =date.split('-');
    this.dateS = parts[2]+"-"+parts[1]+"-"+parts[0];
    this.pincode = pin;
    this.getData();
  }

  fieldsChange18Plus(values:any):void {
    this.isChecked18Plus = values.currentTarget.checked;
    this.getData();
  }
}
