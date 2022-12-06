import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { loginResInterface } from '../../interfaces/loginResInterface';
import { Subject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  loginResUpdate = new Subject<loginResInterface>();

  login(email : string , password : string){
    const json = { email : email, password : password}; 
    return this.http.post<loginResInterface>('http://localhost:3000/api/login', json)
    .pipe(catchError(this.errorHandler))
    .subscribe({
      next: (data) => this.loginResUpdate.next(data),
      error: (error : HttpErrorResponse) => this.loginResUpdate.next(
        {
          message : error.message, 
          status : 'DENIED'
        }
      ),
      complete: () => console.info('complete') 
    });
  }
  private errorHandler( error : HttpErrorResponse ){
    return throwError(()=>{ return error });
  }
  loginResListener() {
    return this.loginResUpdate.asObservable();
  }
}
