import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/config/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = Constants.API_ENDPOINT + '/login';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http : HttpClient) { }

  login(username : string, password : string) {
    const object = {username : username,password : password};
    return this.http.post<boolean>(this.api, object, {headers : this.headers})
  }
}
