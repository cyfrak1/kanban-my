import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { labelServerRes } from '../../interfaces/labelInterface';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  private api : string = Constants.API_ENDPOINT + "/label";
  constructor(private http : HttpClient) { }

  getAllLabels(taskId : number) {
    return this.http.get<labelServerRes>(`${this.api}/getAllLabels/${taskId}`)
  }
}
