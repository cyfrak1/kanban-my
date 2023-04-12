import { Component, OnInit, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { PassDataToDialogService } from 'src/app/core/services/pass-data-to-dialog/pass-data-to-dialog.service';
import { labelData } from 'src/app/core/interfaces/labelInterface';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';
import { LabelDialogWindowComponent } from 'src/app/shared/label-dialog-window/label-dialog-window.component';
import { MatDialog } from '@angular/material/dialog';
import { taskServerRes } from 'src/app/core/interfaces/taskInterface';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { BucketComponent } from '../bucket/bucket.component';
import { CdkDragMove } from '@angular/cdk/drag-drop';
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
  labels : labelData[] = [
    {labelText:'Magda', labelColor:'#978AFF'},
    {labelText:'Zrób', labelColor:'#1199EE'}
  ];
  constructor(
    public dialog: MatDialog,
    private passDataToDialogService : PassDataToDialogService, 
    private contextMenuService : ContextMenuService,
    private tasksService : TasksService
  ) { }

  ngOnInit(): void {

  }
  onDrag(event : any){
    const currentBucketId = event.container._changeDetectorRef._lView[22][3][8].bucketData.id;

    const subscription = this.tasksService.getTask(this.taskData.taskId).subscribe((task : taskServerRes)=>{
      setTimeout(()=>{
        task.bucketId = currentBucketId;
        task.taskSpotInBucket = event.container.data.findIndex((item : taskServerRes)=> item.taskId == this.taskData.taskId);
        const subscription2 = this.tasksService.updateTask(task).subscribe((res)=>{
          subscription2.unsubscribe();
        });
      },10)
      subscription.unsubscribe();
    });
  }
  cardClicked() : void {
    this.passDataToDialogService.getDataToPass(
      this.taskData.taskTitle,
      this.taskData.taskDescription,
      this.currentBucketColor,
      this.taskData.taskDeadlineTime,
      this.labels
    );
    this.isButtonClicked.emit(true);
  }
  getMousePosition( event : MouseEvent ) : void {
    this.contextMenuService.getContextMenuPosition({
      positionX : event.clientX,
      positionY : event.clientY
    });
    this.contextMenuService.updateContextMenuData([
      {menuElementName:'Archiwizuj',functionToLoad: () => ()=>{}},
      {menuElementName:'Edytuj', functionToLoad: ()=>{this.openDialog()}}
    ])
    this.contextMenuService.updateContextMenuState(true,0);
    this.passDataToDialogService.getDataToPass(
      this.taskData.taskTitle,
      this.taskData.taskDescription,
      this.currentBucketColor,
      this.taskData.taskDeadlineTime,
      this.labels
    );
  }
  openDialog() : void {
    this.dialog.open(LabelDialogWindowComponent,{panelClass: 'coustomDialog', disableClose: true});
    this.contextMenuService.updateContextMenuState(false,0);
  }
}
