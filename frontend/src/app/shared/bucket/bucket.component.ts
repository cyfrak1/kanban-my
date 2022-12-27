import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { GetTaskService } from 'src/app/core/services/get-task/get-task.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss']
})
export class BucketComponent implements OnInit {
  @Input() title : string = 'Podaj Tytuł';
  @Input() serialNumber : number = 0;
  @Output() activateDialogLabel = new EventEmitter<boolean>();

  bucketsColors : string[] = ['#22CCDD','#BB66CC','#FFCC66','#CFFDE1','#DEBACE','#E9DAC1'];
  bucketColor : string = '';
  taskArray : string[] = [];
  isEditModeActive : boolean = false;

  constructor( private getTaskService : GetTaskService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    const isSerialNumberCorrect = this.checkSerialNumber();
    if(isSerialNumberCorrect){
      this.setBorderColor();
    }
    this.taskArray = this.getTaskService.getTasksForBucket(this.title);
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
      if(a == 7){
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
  activateEditMode() : void {
    this.isEditModeActive = true;
  }
  disableEditMode( value : string ) : void {
    this.title = value;
    this.isEditModeActive = false;
  }
}
