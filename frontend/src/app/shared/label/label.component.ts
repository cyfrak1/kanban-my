import { Component, Input, OnInit } from '@angular/core';
import { labelType, labelColor } from 'src/app/core/types/labelType';
import { labelSize } from 'src/app/core/interfaces/labelInterface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  @Input() text : string | Date = 'Opis';
  @Input() labelType : labelType = 'TEXT';
  @Input() size : labelSize = { width:70, height:20, fontSize:10};
  @Input() margin : string = '0px';
  @Input() labelColor : string = '#FF88AA';

  private dateDiference : number = 0;

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
  }

  changeLabelColorAccordingToDate() : void {
    let currentDate : any = new Date();
    let dateSent : any = new Date(this.text);
    const diffTime = dateSent - currentDate;
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
    this.text == dateSent;
  }
}
