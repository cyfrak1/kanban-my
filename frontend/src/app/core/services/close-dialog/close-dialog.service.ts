import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloseDialogService {

  private state = new Subject<boolean>();
  constructor() { }

  setIsDialogCloseState( newState : boolean ) : void {
    this.state.next(newState);
  }
  isDialogCloseListener() {
    return this.state.asObservable();
  }
}
