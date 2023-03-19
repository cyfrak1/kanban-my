import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { labelType, labelColor } from 'src/app/core/types/labelType';
import { labelSize } from 'src/app/core/interfaces/labelInterface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input() text : string = 'Opis';
  @Input() labelType : labelType = 'TEXT';
  @Input() size : labelSize = { width:70, height:20, fontSize:10};
  @Input() margin : string = '0px';
  @Input() labelColor : string = '#FF88AA';
  @Input() disableEditModePernamently : boolean = false;
  @Output() textAfterEditMode = new EventEmitter<string>();
  editMode : boolean = false;
  labelWidth : string = '1ch';
  isLabelDelete : boolean = false;
  private dateDiference : number = 0;
  @ViewChild('labelDiv') label !: ElementRef;
  styleObject() : Object {
    return {
      background: this.labelColor,
      height: this.size.height.toString() + 'px',
      margin: this.margin,
    }
  }
  constructor( public datePipe : DatePipe) { }

  ngOnInit(): void {
    if(this.labelType == 'DATE'){
      this.changeLabelColorAccordingToDate();
    }
    // this.labelWidth = this.text.length + 5;
    document.documentElement.style.setProperty("--labelFont", `${this.size.fontSize}px`);
  }

  changeLabelColorAccordingToDate() : void {
    let currentDate : any = new Date();
    let dateSentInArray : any = this.text.split('-')
    let dateSentInUSFormat = `${dateSentInArray[1]}-${dateSentInArray[0]}-${dateSentInArray[2]}`;
    let dateSentAsDate : any = new Date(dateSentInUSFormat);
    const diffTime = dateSentAsDate - currentDate;
    this.dateDiference = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if(this.dateDiference == 1){
      this.labelColor = '#FFAA22';
    }
    else if(this.dateDiference < 1){
      this.labelColor = '#EE4444';
    }
    else if(this.dateDiference > 1){
      this.labelColor = '#22AA99';
    }
    this.text == dateSentAsDate;
  }
  activateEditMode() : void {
    if(!this.disableEditModePernamently){
      this.editMode = true;
    }
  }
  disableEditMode( textAfterEditMode : any ) : void {
    this.editMode = false;
    this.textAfterEditMode.emit(textAfterEditMode.textContent);
    this.text = textAfterEditMode.textContent;
    this.changeLabelColorAccordingToDate();
    if(textAfterEditMode.textContent.length == 0){
      this.deleteLabel();
    }
  }
  deleteLabel() : void {
    this.isLabelDelete = true;
  }
}
