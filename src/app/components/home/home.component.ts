import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  stompClient: any;
  constructor() { }

  ngOnInit(): void {
    console.log("Initialize WebSocket Connection");
    const socket = new SockJS('http://localhost:8080/stomp-endpoint-ws');
    this.stompClient = Stomp.over(socket);

  const _this = this;
  this.stompClient.connect({}, function (frame) {
    _this.stompClient.subscribe('/topic/slots', function (payload) {
      console.log(payload);
    });
  });
  }

}
