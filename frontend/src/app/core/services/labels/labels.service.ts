import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { labelServerRes } from '../../interfaces/labelInterface';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  private api : string = Constants.API_ENDPOINT + "/label";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http : HttpClient) { }

  getAllLabels(taskId : number) {
    return this.http.get<labelServerRes[]>(`${this.api}/getAllLabels/${taskId}`)
  }
  updateLabel(labelId : number, labelText : string) {
    return this.http.patch(`${this.api}/update/${labelId}`,labelText,{headers : this.headers, responseType:"text"})
  }
  addLabel(taskId : number, labelText : string) {
    return this.http.post(`${this.api}/add`,{labelText: labelText, taskId: taskId},{headers : this.headers, responseType:"text"})
  }
  deleteLabel(labelId : number) {
    return this.http.delete(`${this.api}/delete/${labelId}`,{headers : this.headers, responseType:"text"})
  }
}
