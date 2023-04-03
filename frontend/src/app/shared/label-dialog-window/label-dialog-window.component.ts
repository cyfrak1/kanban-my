import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PassDataToDialogService } from 'src/app/core/services/pass-data-to-dialog/pass-data-to-dialog.service';
import { PassDataToDialog, EditMode } from 'src/app/core/interfaces/dialogInterface';
import { CloseDialogService } from 'src/app/core/services/close-dialog/close-dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelComponent } from '../label/label.component';
import { labelWidthChanged } from 'src/app/core/interfaces/labelInterface';

@Component({
  selector: 'app-label-dialog-window',
  templateUrl: './label-dialog-window.component.html',
  styleUrls: ['./label-dialog-window.component.scss']
})
export class LabelDialogWindowComponent implements OnInit {

  dialogData : PassDataToDialog = {
    mainContent : 'ZAPOMNIAŁEŚ DODAĆ TEGO ZADANIA',
    asideContent : 'Napisz tutaj dodatkowe uwagi. Aby to zrobić kliknij dwa razy w tekst.',
    currentBucketColor : '',
    tuskTermin : '',
    labels : []
  };
  editMode : EditMode[] = [
    { modeName : 'mainContent', isActive : false },
    { modeName : 'asideContent', isActive : false },
  ];
  isDisableWindowClose : boolean = false;
  widthOfLabels : number = 0;
  @ViewChildren(LabelComponent) labels !: QueryList<LabelComponent>;
  labelsDataArray : LabelComponent[] = [];
  constructor(
    private passDataToDialogService : PassDataToDialogService, 
    private closeDialogService : CloseDialogService,
    private dialogRef : MatDialogRef<LabelDialogWindowComponent>
  ) { }

  ngOnInit(): void {
    this.dialogData = this.passDataToDialogService.passDataToDialog();
    document.documentElement.style.setProperty('--borderColor', this.dialogData.currentBucketColor);
    const isDialogCloseListener = this.closeDialogService.isDialogCloseListener().subscribe((res)=>{
      this.dialogRef.close();
      isDialogCloseListener.unsubscribe();
    });
  }
  ngAfterViewInit() : void {

    this.labels.changes.subscribe((res)=>{
      this.widthOfLabels = 0;
      this.labelsDataArray = res;
      this.getWidthOfLabels();
      console.log('changed');
    });

    this.labelsDataArray = this.labels.toArray();
    this.getWidthOfLabels();
  }
  getWidthOfLabels() : void {
    this.labelsDataArray.forEach((element : LabelComponent) => {
      if(element.labelType == "TEXT"){
        this.widthOfLabels += element.size.width;
      }
    });
  }
  activeEditMode(editModeNumber : number) : void {
    this.editMode[editModeNumber].isActive = true;
  }
  addNewLabel() : void {
    if(this.widthOfLabels + 124 <= 844){
      this.dialogData.labels.push({
        labelText : 'Nazwij mnie',
        labelColor : '',
      });
    }
  }
  checkIfCanClose() : void {
    if(this.editMode[0].isActive || this.editMode[1].isActive){
      this.isDisableWindowClose = true;
    }
    else{
      this.isDisableWindowClose = true;
    }
  }
  changeDialogSize() : void {
    document.documentElement.style.setProperty('--heightOfDialog', '10px');
  }
  removeLabelFromArray( componentText : string ) : void {
    this.dialogData.labels = this.dialogData.labels.filter((label) => {
      return label.labelText != componentText
    });
    this.labelsDataArray.filter((label)=>{
      if(label.text == componentText){
        this.widthOfLabels -= label.size.width;
      }
    })
  }
}
