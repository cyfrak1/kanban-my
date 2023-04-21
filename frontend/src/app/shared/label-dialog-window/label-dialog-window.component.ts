import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { PassDataToDialogService } from 'src/app/core/services/pass-data-to-dialog/pass-data-to-dialog.service';
import { PassDataToDialog, EditMode } from 'src/app/core/interfaces/dialogInterface';
import { CloseDialogService } from 'src/app/core/services/close-dialog/close-dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelComponent } from '../label/label.component';
import { TasksService } from 'src/app/core/services/tasks/tasks.service';
import { BucketComponent } from '../bucket/bucket.component';
import { Router } from '@angular/router';
import { labelServerRes } from 'src/app/core/interfaces/labelInterface';
import { LabelsService } from 'src/app/core/services/labels/labels.service';
import { Constants } from 'src/app/config/constants';

@Component({
  selector: 'app-label-dialog-window',
  templateUrl: './label-dialog-window.component.html',
  styleUrls: ['./label-dialog-window.component.scss']
})
export class LabelDialogWindowComponent implements OnInit {

  dialogData : PassDataToDialog = {
    taskId : NaN,
    taskTitle : '',
    taskDescription : '',
    taskDeadlineTime : '',
    taskSpotInBucket : NaN,
    bucketId : NaN,
    currentBucketColor : '',
    labels : []
  };
  colors : string[] = Constants.colors;
  isDisableWindowClose : boolean = false;
  widthOfLabels : number = 0;
  @ViewChildren(LabelComponent) labels !: QueryList<LabelComponent>;
  labelsDataArray : LabelComponent[] = [];
  constructor(
    private passDataToDialogService : PassDataToDialogService, 
    private closeDialogService : CloseDialogService,
    private dialogRef : MatDialogRef<LabelDialogWindowComponent>,
    private tasksService : TasksService,
    private router : Router,
    private labelsService : LabelsService
  ) { }

  ngOnInit(): void {
    this.dialogData = this.passDataToDialogService.passDataToDialog();
    document.documentElement.style.setProperty('--borderColor', this.dialogData.currentBucketColor);
    const isDialogCloseListener = this.closeDialogService.isDialogCloseListener().subscribe((res)=>{
      this.dialogRef.close();
      isDialogCloseListener.unsubscribe();
    });
    if(this.dialogData.taskDescription == ''){
      this.dialogData.taskDescription = 'Napisz tutaj dodatkowe uwagi. Aby to zrobić kliknij dwa razy w tekst.';
    }
    if(this.dialogData.taskTitle == ''){
      this.dialogData.taskTitle = 'ZAPOMNIAŁEŚ DODAĆ TEGO ZADANIA';
    }
  }
  ngAfterViewInit() : void {

    this.labels.changes.subscribe((res)=>{
      this.widthOfLabels = 0;
      this.labelsDataArray = res;
      this.getWidthOfLabels();
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
  addNewLabel() : void {
    if(this.widthOfLabels + 124 <= 844){
      const subcription = this.labelsService.addLabel(this.dialogData.taskId,"Nazwij mnie").subscribe(()=>{
        this.labelsService.getAllLabels(this.dialogData.taskId).subscribe((res)=>{
          this.dialogData.labels = res;
        });
        subcription.unsubscribe();
      });
    }
  }
  sendUpdatedData(taskTitle : any, inputAsideContent : any) : void {
    this.dialogData.taskTitle = taskTitle.textContent;
    if(inputAsideContent.textContent.trim() == ""){
      //@ts-ignore
      this.dialogData.taskDescription = null;
    }
    else{
      this.dialogData.taskDescription = inputAsideContent.textContent;
    }
    this.tasksService.updateTask(this.dialogData).subscribe(()=>{});
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/dashboard']);
  }); 
  }
  changeDialogSize() : void {
    document.documentElement.style.setProperty('--heightOfDialog', '10px');
  }
  removeLabelFromArray( laeblId : number ) : void {
    this.labelsService.deleteLabel(laeblId).subscribe(()=>{});
    this.dialogData.labels = this.dialogData.labels.filter((label) => {
      return label.id != laeblId;
    });
  }
  updatedDate(newDate : any) : void {
    this.dialogData.taskDeadlineTime = newDate.labelText;
  }
  updateLabel(updatedLabel : any) : void {
    this.dialogData.labels.forEach((label : labelServerRes) => {
      if(label.id == updatedLabel.labelId){
        label.labelText = updatedLabel.labelText;
        this.labelsService.updateLabel(updatedLabel.labelId, updatedLabel.labelText).subscribe(()=>{})
      }
    })
    console.log(this.dialogData.labels)
  }
}
