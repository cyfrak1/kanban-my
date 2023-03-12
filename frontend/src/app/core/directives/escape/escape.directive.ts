import { Directive, HostListener, ElementRef } from '@angular/core';
import { CloseDialogService } from '../../services/close-dialog/close-dialog.service';

@Directive({
  selector: '[appEscape]'
})
export class EscapeDirective {

  constructor( private element : ElementRef, private closeDialogService : CloseDialogService ) { }
  @HostListener('document:keydown.escape',['$event'])
  onEscape() : void {
    this.closeDialogService.setIsDialogCloseState(true);
  }

}
