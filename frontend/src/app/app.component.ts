import { Component, HostListener, OnInit } from '@angular/core';
import { WebsocketConnectionService } from './core/services/websocket-connection/websocket-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  constructor(private websocketConnectionService : WebsocketConnectionService) { }
  ngOnInit(): void {
    this.websocketConnectionService.active();
  }
  @HostListener('contextmenu', ['$event'])
  onRightClick(event : any) {
    event.preventDefault();
  }
}
