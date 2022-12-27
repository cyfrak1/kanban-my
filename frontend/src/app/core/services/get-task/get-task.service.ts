import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTaskService {

  constructor() { }

  getTasksForBucket(bucketName : string) : string[] {
    // in the next version from server now from array
    if(bucketName == 'Nowe'){
      return ['Tłumaczenie hiszpańskiego na portugalski','tłumaczenie prawa jazdy na angielski','tłumaczenie pisma z sądu','tłumaczenie Pop Smoke "Foreigner"',"Tłumaczenie Avatara 2"]
    }
    else if(bucketName == 'Do werfikacji'){
      return ['Tłumaczenie z jęzuka niemieckiego :( na polski']
    }
    else if(bucketName == 'Czekaj'){
      return ['Posprzątanie biura przed inspekcją']
    }
    else{
      return [];
    }
  }
}
