import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContextMenuPosition } from '../../interfaces/contextMenuInterface';
import { ContextMenuData } from '../../interfaces/contextMenuInterface';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  private position : ContextMenuPosition = { positionX : 0, positionY : 0 };
  private ContextMenuData = new Subject<ContextMenuData[]>();
  private state = new Subject<boolean>();
  constructor() { }
  getContextMenuPosition( position : ContextMenuPosition ) : void {
    this.position = position;
    document.documentElement.style.setProperty('--contextMenuX',`${position.positionX}px`);
    document.documentElement.style.setProperty('--contextMenuY', `${position.positionY}px`);
  }
  returnContextMenuPosition() : ContextMenuPosition {
    return this.position;
  }
  updateContextMenuState( newState : boolean, id : number ) : void {
    this.state.next(newState);
  }
  isContextMenuActiveListener() {
    return this.state.asObservable();
  }
  updateContextMenuData( data : ContextMenuData[] ) : void {
    this.ContextMenuData.next(data);
  }
  ContextMenuDataListener() {
    return this.ContextMenuData.asObservable();
  }
}
