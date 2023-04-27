import { Component, OnInit} from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { LabelDialogWindowComponent } from 'src/app/shared/label-dialog-window/label-dialog-window.component';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';
import { ViewportScroller } from '@angular/common';
import { ContextMenuData } from 'src/app/core/interfaces/contextMenuInterface';
import { BucketsService } from 'src/app/core/services/buckets/buckets.service';
import { bucketServerRes } from 'src/app/core/interfaces/bucketInterface';
import { WebsocketService } from 'src/app/core/services/websocket-config/websocket.service';
import { websocketResponseType } from 'src/app/core/types/websocketResponse';
import { WebsocketConnectionService } from 'src/app/core/services/websocket-connection/websocket-connection.service';

@Component({
  selector: 'app-dasboard-page',
  templateUrl: './dasboard-page.component.html',
  styleUrls: ['./dasboard-page.component.scss']
})
export class DasboardPageComponent implements OnInit {

  buckets : bucketServerRes[] = [];
  contextMenuList : ContextMenuData[] = [
    {menuElementName:'Archiwizuj',functionToLoad: () => ()=>{}},
    {menuElementName:'Edytuj', functionToLoad: () => this.activateDialogLabel()}
  ]
  contextMenuState : boolean = false;
  constructor(
    public dialog: MatDialog, 
    private scroll : ViewportScroller, 
    private contextMenuService : ContextMenuService, 
    private bucketsService : BucketsService,
    private websocketService : WebsocketService,
    private websocketConnectionService : WebsocketConnectionService
    ) { }

  ngOnInit(): void {
    this.contextMenuService.isContextMenuActiveListener().subscribe((res : boolean)=>{
      this.contextMenuState = res;
    });
    this.getBucketsFromServer();
    this.websocketConnectionService.webSocketConnectionResponse().subscribe((res : websocketResponseType)=>{
      if(res == "buckets"){
        this.getBucketsFromServer();
      }
    })
  }
  getBucketsFromServer() : void {
    const connection = this.bucketsService.getAllBuckets().subscribe((data : bucketServerRes[])=>{
      this.buckets = data;
      connection.unsubscribe();
    })
  }
  activateDialogLabel() : void {
    this.dialog.open(LabelDialogWindowComponent,{panelClass: 'coustomDialog', disableClose: true});
    if(this.contextMenuState){
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
    const connection = this.bucketsService.addNewBucket({"bucketName":"Nazwij mnie"}).subscribe((res)=>{
      this.getBucketsFromServer();
      this.websocketService.send('buckets');
      connection.unsubscribe();
    })
  }
  changeContextMenuState() : void {
    this.contextMenuService.updateContextMenuState(false,0);
    this.scroll.scrollToPosition([window.innerWidth,0])
  }
}
