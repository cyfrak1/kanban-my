import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { websocketResponseType } from '../../types/websocketResponse';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private WEBSOCKET_ADRESS : string = Constants.WEBSOCKET_ADRESS;
  private socket = new SockJS(this.WEBSOCKET_ADRESS);
  private stompClient = Stomp.over(this.socket);
  constructor() { }

  subscribe(topic : string, callback : any) {
    const connected : boolean = this.stompClient.connected;
    if(connected) {
      this.subscribeToTopic(topic,callback);
      return;
    }

    this.stompClient.connect({}, () => {
      this.subscribeToTopic(topic,callback);
    })
  }
  send(value : websocketResponseType) : void {
    this.stompClient.send('/topic/messages',{},value);
  }
  private subscribeToTopic(topic : string, callback : any) {
    this.stompClient.subscribe(topic, (res : websocketResponseType)=> {
      callback(res);
    })
  }
}
