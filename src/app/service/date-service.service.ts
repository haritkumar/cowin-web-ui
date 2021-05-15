import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  constructor() { }

  //2021-05-21
  getTodayDate(): string{
    let c_date = new Date();
    return c_date.getFullYear()+"-"+("0" + (c_date.getMonth()+1)).slice(-2)+"-"+c_date.getDate();
  }
//21-05-2021
getTodayDateFormat(): string{
  let c_date = new Date();
  return c_date.getDate()+"-"+("0" + (c_date.getMonth()+1)).slice(-2)+"-"+c_date.getFullYear();
}
  
}
