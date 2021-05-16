import { Component, OnInit } from '@angular/core';
import { States } from 'src/app/modal/states';
import {State} from 'src/app/modal/state';
import {CowinService} from '../../service/cowin.service';
import {DateServiceService} from '../../service/date-service.service';
import { District } from 'src/app/modal/district';
import { Districts } from 'src/app/modal/districts';
import { interval } from 'rxjs';

@Component({
  selector: 'app-calendar-dist',
  templateUrl: './calendar-dist.component.html'
})
export class CalendarDistComponent implements OnInit {

  states: State[] = [];
  districts: District[] = [];
  stateS: number = 9;
  distS: number;
  date: string = this.dateServiceService.getTodayDate();
  dateS: string = this.dateServiceService.getTodayDateFormat();
  apiStatus: string = 'cg';
  isChecked18Plus: boolean = false;
  tableData: any[] = [];
  dataCalendar: any = {};
  secondsCounter = interval(5000);
  
  constructor(private cowinService: CowinService,
    private dateServiceService: DateServiceService) {
    this.secondsCounter.subscribe(n =>{
      this.getData();
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
  ngOnInit(): void {
    this.getStates();
    this.getDists();
    this.getData();
  }

  getStates(): void{
    this.cowinService.getStates()
      .subscribe((data:States) => {
        this.states = data.states;
      },
      error => {
        this.apiStatus = 'cr';
      });
  }

  getDists(): void{
    this.cowinService.getDistrict(this.stateS)
      .subscribe((data:Districts) => {
        this.districts = data.districts;
      },
      error => {
        this.apiStatus = 'cr';
      },
      () => { // when complete
        this.distS = this.districts[0].district_id;
      });
  }

  changeDist(state) {
    this.stateS = state;
    this.getDists();
  }

  updateFilter(state, dist, date): void{
    console.log(state +" - "+dist+" - "+date);
    var parts =date.split('-');
    this.dateS = parts[2]+"-"+parts[1]+"-"+parts[0];
    this.stateS = state;
    this.distS = dist;
    this.getData();
  }

  fieldsChange18Plus(values:any):void {
    this.isChecked18Plus = values.currentTarget.checked;
    this.getData();
  }

  getData(): void{
    this.cowinService.getCalendarByDist(this.distS, this.dateS)
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
}
