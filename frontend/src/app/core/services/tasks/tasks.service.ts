import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { Subject, catchError, take, throwError } from 'rxjs';
import { bucketServerRes } from '../../interfaces/bucketInterface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { taskServerRes } from '../../interfaces/taskInterface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private api : string = Constants.API_ENDPOINT + "/task";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http : HttpClient) { }

  getAllTasks(bucketId : number) {
    return this.http.get<taskServerRes[]>(`${this.api}/getAllTasks/${bucketId}`,{headers:this.headers})
  }
  getTask(taskId : number) {
    return this.http.get<taskServerRes>(`${this.api}/getTask/${taskId}`,{headers:this.headers});
  }
  updateTask(task : taskServerRes) {
    return this.http.put(`${this.api}/update/${task.taskId}`,task,{headers: this.headers, responseType:"text"})
  }
}
