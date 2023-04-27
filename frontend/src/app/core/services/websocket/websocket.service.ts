import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // private API : string = Constants.websocket;
  // private socket = SockJS
  // constructor() { }

  socketSubscription() {
    const ws = new WebSocket('ws://localhost:8080');
    ws.addEventListener("open",(res : any)=>{
      console.log(res)
    })
  }
}
