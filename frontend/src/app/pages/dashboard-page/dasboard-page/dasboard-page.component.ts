import { Component, OnInit, ViewChild} from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { LabelDialogWindowComponent } from 'src/app/shared/label-dialog-window/label-dialog-window.component';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';
import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ContextMenuData } from 'src/app/core/interfaces/contextMenuInterface';

@Component({
  selector: 'app-dasboard-page',
  templateUrl: './dasboard-page.component.html',
  styleUrls: ['./dasboard-page.component.scss']
})
export class DasboardPageComponent implements OnInit {

  buckets : string[] = ['Nowe','Do werfikacji','Czekaj','Ukończone'];
  contextMenuList : ContextMenuData[] = [
    {menuElementName:'Archiwizuj',functionToLoad: () => this.createNewBucket()},
    {menuElementName:'Edytuj', functionToLoad: () => this.activateDialogLabel()}
  ]
  contextMenuState : boolean = false;
  constructor(public dialog: MatDialog, private scroll : ViewportScroller, private router : Router, private contextMenuService : ContextMenuService, private authStatusService : AuthStatusService) { }

  ngOnInit(): void {
    if(this.authStatusService.showStatus() == 'DENIED'){
      // this.router.navigate(['/login']);
    }
    this.contextMenuService.isContextMenuActiveListener().subscribe((res : boolean)=>{
      this.contextMenuState = res;
    });
  }
  activateDialogLabel() : void {
    this.dialog.open(LabelDialogWindowComponent,{panelClass: 'coustomDialog', disableClose: true});
    if(this.contextMenuState){
      this.contextMenuService.updateContextMenuClickedOnElement('task');
      this.changeContextMenuState();
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
    this.scroll.scrollToPosition([window.innerWidth,0])
  }
}
