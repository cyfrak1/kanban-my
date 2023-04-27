import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket-config/websocket.service';
import { Observable, Subject } from 'rxjs';
import { websocketResponseType } from '../../types/websocketResponse';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {

  private SocketResponse = new Subject<websocketResponseType>();
  constructor(private websocketService : WebsocketService) { }

  active() : void {
    this.websocketService.subscribe('/topic/messages', (res : any)=> {
      this.SocketResponse.next(res.body);
    })
  }
  webSocketConnectionResponse() : Observable<websocketResponseType> {
    return this.SocketResponse.asObservable();
  }
}