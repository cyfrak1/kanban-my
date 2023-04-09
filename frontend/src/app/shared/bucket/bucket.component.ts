import { Component, OnInit, Input, Output, EventEmitter, ComponentRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GetTaskService } from 'src/app/core/services/get-task/get-task.service';
import { MatDialog } from '@angular/material/dialog';
import { ContextMenuService } from 'src/app/core/services/context-menu/context-menu.service';
import { bucketServerRes } from 'src/app/core/interfaces/bucketInterface';
import { BucketsService } from 'src/app/core/services/buckets/buckets.service';

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
  taskArray : string[] = [];
  isEditModeActive : boolean = false;
  isBucketActive : boolean = true;

  constructor( 
    private getTaskService : GetTaskService, 
    public dialog: MatDialog,
    private contextMenuService : ContextMenuService,
    private bucketsService : BucketsService
  ) { }

  ngOnInit(): void {
    const isSerialNumberCorrect = this.checkSerialNumber();
    if(isSerialNumberCorrect){
      this.setBorderColor();
    }
    this.taskArray = this.getTaskService.getTasksForBucket(this.bucketData.bucketName);
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
  drop(event: CdkDragDrop<string[]>) : void {
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
