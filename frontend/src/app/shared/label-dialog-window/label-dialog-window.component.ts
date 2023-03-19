import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PassDataToDialogService } from 'src/app/core/services/pass-data-to-dialog/pass-data-to-dialog.service';
import { PassDataToDialog, EditMode } from 'src/app/core/interfaces/dialogInterface';
import { CloseDialogService } from 'src/app/core/services/close-dialog/close-dialog.service';
import { MatDialogRef } from '@angular/material/dialog';

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
  @ViewChild('inputTitle') mainContentHtmlRef !: ElementRef<HTMLElement>;
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
    console.log(this.mainContentHtmlRef);
  }
  activeEditMode(editModeNumber : number) : void {
    this.editMode[editModeNumber].isActive = true;
  }
  deactivateEditMode(editModeNumber : number, newContent : any) : void {
    console.log(this.editMode[editModeNumber].modeName)
    if(this.editMode[editModeNumber].modeName == "mainContent"){
      this.dialogData.mainContent = newContent.textContent;
    }
    else if(this.editMode[editModeNumber].modeName == "asideContent"){
      this.dialogData.asideContent = newContent.textContent;
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
  changeDialogSize() : void {
    document.documentElement.style.setProperty('--heightOfDialog', '10px');
  }
}
