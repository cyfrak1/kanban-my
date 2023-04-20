import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GetTaskService } from 'src/app/core/services/get-task/get-task.service';
import { MatDialog } from '@angular/material/dialog';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';
import { bucketServerRes } from 'src/app/core/interfaces/bucketInterface';
import { BucketsService } from 'src/app/core/services/buckets/buckets.service';
import { taskServerRes } from 'src/app/core/interfaces/taskInterface';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
  @Input() bucketData : bucketServerRes = {
    id:0,
    bucketName:""
  }
  @Input() serialNumber : number = 0;
  @Output() activateDialogLabel = new EventEmitter<boolean>();

  bucketsColors : string[] = ['#22CCDD','#BB66CC','#FFCC66','#CFFDE1','#DEBACE','#E9DAC1'];
  bucketColor : string = '';
  taskArray : taskServerRes[] = [];
  isEditModeActive : boolean = false;
  isBucketActive : boolean = true;

  constructor( 
    private getTaskService : GetTaskService, 
    public dialog: MatDialog,
    private contextMenuService : ContextMenuService,
    private bucketsService : BucketsService,
    private tasksService : TasksService
  ) { }

  ngOnInit(): void {
    const isSerialNumberCorrect = this.checkSerialNumber();
    if(isSerialNumberCorrect){
      this.setBorderColor();
    }
    this.getAllTasks();
  }
  getAllTasks() : void {
    const subscription = this.tasksService.getAllTasks(this.bucketData.id).subscribe((res : taskServerRes[])=>{
      this.taskArray = res.sort((a,b)=> a.taskSpotInBucket - b.taskSpotInBucket);
      subscription.unsubscribe();
    })
  }
  checkSerialNumber() : boolean {
    if(this.serialNumber == 0){
      console.error('Add serial number to card-component in html');
      return false;
    }
    else{
      return true;
    }
  }
  setBorderColor() : void {
    let a : number = 0;
    for(let i : number = 1; i <= this.serialNumber; i++){
      if(a == this.bucketsColors.length - 1){
        a = 0;
      }
      this.bucketColor = this.bucketsColors[a];
      a++;
    }
  }
  drop(event: CdkDragDrop<taskServerRes[]>) : void {
    setTimeout(()=>{
      const tasks : taskServerRes[] = event.container.data;
      tasks.forEach((element, currentIndex)=>{
        element.taskSpotInBucket = currentIndex;
      });
      this.tasksService.updateAllTasks(this.bucketData.id,event.container.data).subscribe();
    },1)
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
  elementDrag(event : any, taskId : number) : void {
    const subscription = this.tasksService.getTask(taskId).subscribe((task : taskServerRes)=>{
      task.bucketId = this.bucketData.id;
      this.tasksService.updateTask(task);
      subscription.unsubscribe();
    });
  }
  isButtonClicked( buttonState : boolean ) : void {
    if(!this.dialog.openDialogs || !this.dialog.openDialogs.length){
      this.activateDialogLabel.emit(buttonState);
    }
  }
  activateContextMenu( event : MouseEvent ) : void {
    this.contextMenuService.getContextMenuPosition({
      positionX : event.clientX,
      positionY : event.clientY
    });
    this.contextMenuService.updateContextMenuState(true,this.serialNumber);
    this.contextMenuService.updateContextMenuData([
      {menuElementName:'Archiwizuj',functionToLoad: ()=>{this.deleteBucket()}},
      {menuElementName:'Edycja', functionToLoad: ()=>{this.activateEditMode()}}
    ]);
  }
  activateEditMode() : void {
    this.isEditModeActive = true;
    this.contextMenuService.updateContextMenuState(false,0);
  }
  disableEditMode( value : string ) : void {
    this.bucketData.bucketName = value;
    this.bucketsService.updateBucket(this.bucketData);
    this.isEditModeActive = false;
  }
  deleteBucket() : void {
    this.bucketsService.deleteBucket(this.bucketData.id);
    this.isBucketActive = false;
  }
}
