import { Component, OnInit} from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { LabelDialogWindowComponent } from 'src/app/shared/label-dialog-window/label-dialog-window.component';


@Component({
  selector: 'app-dasboard-page',
  templateUrl: './dasboard-page.component.html',
  styleUrls: ['./dasboard-page.component.scss']
})
export class DasboardPageComponent implements OnInit {

  buckets : string[] = []
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {

  }
  activateDialogLabel( activate : boolean ) : void {
    if(activate){
      this.dialog.open(LabelDialogWindowComponent,{panelClass: 'coustomDialog', disableClose: true});
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
}
