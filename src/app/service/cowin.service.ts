import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CowinService {

  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
  }

  getDistrict(stateId: number) {
    return this.http.get('https://cdn-api.co-vin.in/api/v2/admin/location/districts/'+stateId);
  }

  getCalendarByPin(pincode: number, date: string){
      return this.http.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode='+pincode+'&date='+date);
  }
  
  getCalendarByDist(dist: number, date: string){
    //console.log(dist+" - "+date);
    return this.http.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id='+dist+'&date='+date);
}

}
