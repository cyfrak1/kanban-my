import { Component, OnInit} from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { LabelDialogWindowComponent } from 'src/app/shared/label-dialog-window/label-dialog-window.component';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';

@Component({
  selector: 'app-dasboard-page',
  templateUrl: './dasboard-page.component.html',
  styleUrls: ['./dasboard-page.component.scss']
})
export class DasboardPageComponent implements OnInit {

  buckets : string[] = ['Nowe','Do werfikacji','Czekaj','Ukończone'];
  contextMenuState : boolean = false;
  constructor(public dialog: MatDialog, private contextMenuService : ContextMenuService) { }

  ngOnInit(): void {
    this.contextMenuService.isContextMenuActiveListener().subscribe((res : boolean)=>{
      this.contextMenuState = res;
    });
  }
  activateDialogLabel( activate : boolean ) : void {
    if(activate){
      this.dialog.open(LabelDialogWindowComponent,{panelClass: 'coustomDialog', disableClose: true});
      if(this.contextMenuState){
        this.changeContextMenuState();
      }
    }
  }
  dragMove( event : CdkDragMove ) : void {
    event.pointerPosition
  }
  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  createNewBucket() : void {
    this.buckets.push('Nazwij mnie');
  }
  changeContextMenuState() : void {
    this.contextMenuService.updateContextMenuState(false);
  }
}
