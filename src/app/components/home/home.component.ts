import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  stompClient: any;
  disabled = true;
  sessionsMap = new Map();  
  totalSlots: number = 0;
  secondsCounter = interval(1000);

  constructor() {
    this.secondsCounter.subscribe(n =>{
      let totalSlots = 0;
      this.sessionsMap.forEach((value: any, key: string) => {
        totalSlots = totalSlots+value.available_capacity;
    });
    this.totalSlots = totalSlots;
    }
      );
   }

   
  setConnected(connected: boolean) {
    this.disabled = !connected;
  }

  ngOnInit(): void {
    console.log("Initialize WebSocket Connection");
    const socket = new SockJS('http://localhost:8080/stomp-endpoint-ws');
    this.stompClient = Stomp.over(socket);
    //this.stompClient.debug = null
  const _this = this;
  this.stompClient.connect({}, function (frame) {
    _this.stompClient.subscribe('/topic/slotByPin', function (payload) {
    JSON.parse(payload.body).sessions.forEach( (session) => {
       _this.sessionsMap.set(session.date+'--'+session.center_id+'--'+session.pincode, session);  
    });
    });
  });
  }
  getCSSClass(capacity) {
    if(capacity <= 10){
      return { bg: "bg-r" };
    }else if(capacity > 10 && capacity <= 50){
      return { bg: "bg-y" };
    }else{
      return  { bg: "bg-g" }
    }
  }
  ngOnDestroy() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.setConnected(false);
  }

}
