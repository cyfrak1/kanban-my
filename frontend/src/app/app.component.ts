import { Component, HostListener, OnInit } from '@angular/core';
import { WebsocketService } from './core/services/websocket/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  constructor(private websocketService : WebsocketService) { }
  @HostListener('contextmenu', ['$event'])
  onRightClick(event : any) {
    event.preventDefault();
  }
  ngOnInit() : void {
    this.websocketService.socketSubscription()
  }
}
