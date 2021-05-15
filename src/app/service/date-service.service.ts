import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {

  constructor() { }

  //21-05-2021
  getTodayDate(): string{
    let c_date = new Date();
    return c_date.getDate()+"-"+("0" + (c_date.getMonth()+1)).slice(-2)+"-"+c_date.getFullYear();
  }

  
}
