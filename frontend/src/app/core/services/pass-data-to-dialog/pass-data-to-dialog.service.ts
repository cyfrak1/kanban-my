import { Injectable } from '@angular/core';
import { labelData } from '../../interfaces/labelInterface';
import { PassDataToDialog } from '../../interfaces/dialogInterface';

@Injectable({
  providedIn: 'root'
})
export class PassDataToDialogService {

  private dialogData : PassDataToDialog | any;

  getDataToPass(data : PassDataToDialog) : void {
    this.dialogData = data;
  }
  passDataToDialog() : PassDataToDialog {
    return this.dialogData;
  }
}
