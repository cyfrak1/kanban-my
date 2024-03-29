import { Component, OnInit, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { PassDataToDialogService } from 'src/app/core/services/pass-data-to-dialog/pass-data-to-dialog.service';
import { labelServerRes } from 'src/app/core/interfaces/labelInterface';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';
import { LabelDialogWindowComponent } from 'src/app/shared/label-dialog-window/label-dialog-window.component';
import { MatDialog } from '@angular/material/dialog';
import { taskServerRes } from 'src/app/core/interfaces/taskInterface';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { BucketComponent } from '../bucket/bucket.component';
import { LabelsService } from 'src/app/core/services/labels/labels.service';
import { PassDataToDialog } from 'src/app/core/interfaces/dialogInterface';
import { Constants } from 'src/app/config/constants';
import { WebsocketConnectionService } from 'src/app/core/services/websocket-connection/websocket-connection.service';
import { WebsocketService } from 'src/app/core/services/websocket-config/websocket.service';
import { websocketResponseType } from 'src/app/core/types/websocketResponse';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() taskData : taskServerRes = {
    taskId: NaN,
    taskTitle : 'Zapomniałeś dodać tekstu tego zadania!!!',
    taskDescription : '',
    taskDeadlineTime : '',
    taskSpotInBucket : NaN,
    bucketId : NaN,
  }
  @Input() currentBucketColor : string = '';
  @Output() isButtonClicked = new EventEmitter<boolean>();
  @ViewChildren(BucketComponent) buckets !: QueryList<BucketComponent>;
  labels : labelServerRes[] = [];
  isTaskActive : boolean = true;
  isDotActive : boolean = true;
  colors : string[] = Constants.colors;
  constructor(
    public dialog: MatDialog,
    private passDataToDialogService : PassDataToDialogService, 
    private contextMenuService : ContextMenuService,
    private tasksService : TasksService,
    private labelsService : LabelsService,
    private websocketService : WebsocketService,
    private websocketConnectionService : WebsocketConnectionService
  ) { }

  ngOnInit(): void {
    this.getAllLabels();
    this.checkIfDotIsActive();
    this.websocketConnectionService.webSocketConnectionResponse().subscribe((res : websocketResponseType)=>{
      if(res == "labels"){
        this.getAllLabels();
      }
    })
  }
  getAllLabels() : void {
    this.labelsService.getAllLabels(this.taskData.taskId).subscribe((res : labelServerRes[])=>{
      const labels = res.sort((a,b) => a.id - b.id);
      this.labels = labels;
    })
  }
  checkIfDotIsActive() : void{
    if(this.taskData.taskDescription == null) {
      this.isDotActive = false;
    }
    else{
      this.isDotActive = true;
    }
  }
  passDataToDialog() : void {
    const dataToPass : PassDataToDialog = {
      taskId : this.taskData.taskId,
      taskTitle : this.taskData.taskTitle,
      taskDescription : this.taskData.taskDescription as string,
      taskDeadlineTime : this.taskData.taskDeadlineTime,
      taskSpotInBucket : this.taskData.taskSpotInBucket,
      bucketId : this.taskData.bucketId,
      currentBucketColor : this.currentBucketColor,
      labels : this.labels
    }
    this.passDataToDialogService.getDataToPass(dataToPass);
  }
  onDrag(event : any){
    this.taskData.bucketId = event.container._changeDetectorRef._lView[22][3][8].bucketData.id;
    this.tasksService.updateTask(this.taskData).subscribe((res)=>{});
    this.websocketService.send('tasks');
  }
  cardClicked() : void {
    this.passDataToDialog();
    this.isButtonClicked.emit(true);
  }
  getMousePosition( event : MouseEvent ) : void {
    this.contextMenuService.getContextMenuPosition({
      positionX : event.clientX,
      positionY : event.clientY
    });
    this.contextMenuService.updateContextMenuData([
      {menuElementName:'Archiwizuj',functionToLoad: () => this.deleteCard()},
      {menuElementName:'Edytuj', functionToLoad: ()=>{this.openDialog()}}
    ])
    this.contextMenuService.updateContextMenuState(true,0);
    this.passDataToDialog();
  }
  openDialog() : void {
    this.dialog.open(LabelDialogWindowComponent,{panelClass: 'coustomDialog', disableClose: true});
    this.contextMenuService.updateContextMenuState(false,0);
  }
  deleteCard() : void {
    this.tasksService.deleteTask(this.taskData.taskId).subscribe((res)=>{ });
    this.isTaskActive = false;
  }
}
