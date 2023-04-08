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
  private addNewBucketRes = new Subject<string>();

  constructor(private http : HttpClient) { }

  getAllBuckets(){
    this.getBuckets();
    return this.getAllBucketsRes.asObservable();
  }
  private getBuckets() : void {
    console.log(this.api)
    this.http.get<bucketServerRes[]>(`${this.api}/getAllBuckets`,{headers: this.headers})
    .pipe(catchError(this.errorHandler))
    .subscribe((data : bucketServerRes[]) => this.getAllBucketsRes.next(data));
  }
  addNewBucket(newBucket : any){
    this.addBucket(newBucket);
    return this.addNewBucketRes.asObservable();
  }
  private addBucket(newBucket : any) : void {
    this.http.post(`${this.api}/add`, newBucket, {headers : this.headers, responseType:"text"})
    .pipe(catchError(this.errorHandler))
    .subscribe((res) => this.addNewBucketRes.next(res));
  }
  private errorHandler( error : HttpErrorResponse ){
    return throwError(()=>{ return error });
  }
}
