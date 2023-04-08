import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { Subject, catchError, throwError } from 'rxjs';
import { bucketServerRes } from '../../interfaces/bucketInterface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BucketsService {

  private api : string = Constants.API_ENDPOINT + "/bucket";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private getAllBucketsRes = new Subject<bucketServerRes[]>();

  constructor(private http : HttpClient) { }

  getAllBuckets(){
    this.getBuckets();
    return this.getAllBucketsRes.asObservable();
  }

  private getBuckets() : void{
    console.log(this.api)
    this.http.get<bucketServerRes[]>(`${this.api}/getAllBuckets`,{headers: this.headers})
    .pipe(catchError(this.errorHandler))
    .subscribe((data : bucketServerRes[]) => this.getAllBucketsRes.next(data));
  }
  private errorHandler( error : HttpErrorResponse ){
    return throwError(()=>{ return error });
  }
}
