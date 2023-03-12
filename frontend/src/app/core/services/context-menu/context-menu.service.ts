import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContextMenuPosition } from '../../interfaces/contextMenuInterface';
import { ClickedOnElement } from '../../types/contextMenu';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  private position : ContextMenuPosition = { positionX : 0, positionY : 0 };
  private clickedOn = new Subject<ClickedOnElement>();
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
  updateContextMenuState( newState : boolean ) : void {
    this.state.next(newState);
  }
  isContextMenuActiveListener() {
    return this.state.asObservable();
  }
  updateContextMenuClickedOnElement( element : ClickedOnElement ) : void {
    this.clickedOn.next(element);
  }
  ClickedOnElementListener() {
    return this.clickedOn.asObservable();
  }
}
