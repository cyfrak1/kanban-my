import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
  array : string[] = ['Wow zrobiłeś to','super to zrobiłeś','prawie ci sie udało']
  constructor() { }

  ngOnInit(): void {
    const isSerialNumberCorrect = this.checkSerialNumber();
    if(isSerialNumberCorrect){
      this.setBorderColor();
    }
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
    this.activateDialogLabel.emit(buttonState);
  }

}
