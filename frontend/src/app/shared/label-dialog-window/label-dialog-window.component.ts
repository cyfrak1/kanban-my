import { Component, OnInit } from '@angular/core';
import { PassDataToDialogService } from 'src/app/core/services/pass-data-to-dialog/pass-data-to-dialog.service';
import { PassDataToDialog, EditMode } from 'src/app/core/interfaces/dialogInterface';

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
  constructor(private passDataToDialogService : PassDataToDialogService) { }

  ngOnInit(): void {
    this.dialogData = this.passDataToDialogService.passDataToDialog();
    document.documentElement.style.setProperty('--borderColor',this.dialogData.currentBucketColor);
  }
  ngAfterViewInit(): void {
    console.log(this.dialogData.labels)
  }
  activeEditMode(editModeNumber : number) : void {
    this.editMode[editModeNumber].isActive = true;
  }
  deactivateEditMode(editModeNumber : number, newContent : string) : void {
    if(this.editMode[editModeNumber].modeName == "mainContent"){
      this.dialogData.mainContent = newContent;
    }
    this.editMode[editModeNumber].isActive = false;
  }
  addNewLabel() : void {
    this.dialogData.labels.push({
      labelText : 'Nazwij mnie',
      labelColor : '',
    });
  }
  removeLabel(labelText : string) : void {
    const labelIndex = this.dialogData.labels.findIndex((value , index)=> {
      return value.labelText == labelText && index;
    })
    this.dialogData.labels.splice(labelIndex, 1);
    console.log(this.dialogData.labels)
  }
}
