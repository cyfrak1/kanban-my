import { Injectable } from '@angular/core';
import { labelData } from '../../interfaces/labelInterface';
import { PassDataToDialog } from '../../interfaces/dialogInterface';

@Injectable({
  providedIn: 'root'
})
export class PassDataToDialogService {

  private mainContent : string = '';
  private asideContent : string = 'Napisz tutaj dodatkowe uwagi. Aby to zrobić kliknij dwa razy w tekst.';
  private currentBucketColor : string = '';
  private tuskTermin : string = '';
  private labels : labelData[] = [];
  constructor() { }

  getDataToPass(mainContent : string, asideContent : string, currentBucketColor : string, tuskTermin : string, labels : labelData[]) : void {
    this.mainContent = mainContent;
    this.currentBucketColor = currentBucketColor;
    this.tuskTermin = tuskTermin;
    this.labels = labels;
    if(asideContent != ''){
      this.asideContent = asideContent;
    }
  }
  passDataToDialog() : PassDataToDialog {
    return {
      mainContent : this.mainContent,
      asideContent : this.asideContent,
      currentBucketColor : this.currentBucketColor,
      tuskTermin : this.tuskTermin,
      labels : this.labels
    }
  }
}
