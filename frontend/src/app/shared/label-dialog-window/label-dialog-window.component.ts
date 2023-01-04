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
  isDisableWindowClose : boolean = false;
  constructor(private passDataToDialogService : PassDataToDialogService) { }

  ngOnInit(): void {
    this.dialogData = this.passDataToDialogService.passDataToDialog();
    document.documentElement.style.setProperty('--borderColor',this.dialogData.currentBucketColor);
  }
  activeEditMode(editModeNumber : number) : void {
    this.editMode[editModeNumber].isActive = true;
  }
  deactivateEditMode(editModeNumber : number, newContent : string) : void {
    if(this.editMode[editModeNumber].modeName == "mainContent"){
      this.dialogData.mainContent = newContent;
    }
    else if(this.editMode[editModeNumber].modeName == "asideContent"){
      this.dialogData.asideContent = newContent;
    }
    this.editMode[editModeNumber].isActive = false;
  }
  addNewLabel() : void {
    this.dialogData.labels.push({
      labelText : 'Nazwij mnie',
      labelColor : '',
    });
  }
  checkIfCanClose() : void {
    if(this.editMode[0].isActive || this.editMode[1].isActive){
      this.isDisableWindowClose = true;
    }
    else{
      this.isDisableWindowClose = true;
    }
  }
}
