import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PassDataToDialogService } from 'src/app/core/services/pass-data-to-dialog/pass-data-to-dialog.service';
import { labelData } from 'src/app/core/interfaces/labelInterface';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() text : string = 'Zapomniałeś dodać tekstu tego zadania!!!';
  @Input() asideText : string = '';
  @Input() currentBucketColor : string = '';
  @Input() tuskTermin : string = '';
  @Output() isButtonClicked = new EventEmitter<boolean>();

  labels : labelData[] = [
    {labelText:'Magda', labelColor:'#978AFF'},
    {labelText:'Zrób', labelColor:'#1199EE'}
  ];
  constructor(private passDataToDialogService : PassDataToDialogService, private contextMenuService : ContextMenuService) { }

  ngOnInit(): void {

  }
  cardClicked() : void {
    this.passDataToDialogService.getDataToPass(this.text,this.asideText,this.currentBucketColor,this.tuskTermin,this.labels);
    this.isButtonClicked.emit(true);
  }
  drop(event: CdkDragDrop<any>) {
    // moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }
  getMousePosition( event : MouseEvent ) : void {
    this.contextMenuService.getContextMenuPosition({
      positionX : event.clientX,
      positionY : event.clientY
    });
    this.contextMenuService.updateContextMenuClickedOnElement('task')
    this.contextMenuService.updateContextMenuState(true);
    this.passDataToDialogService.getDataToPass(this.text,this.asideText,this.currentBucketColor,this.tuskTermin,this.labels);
  }
}
