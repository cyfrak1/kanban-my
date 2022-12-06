import { Injectable } from '@angular/core';
import { loginResInterface } from '../../interfaces/loginResInterface';
import { status } from '../../types/status';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {

  private loginStatus : status = 'DENIED'
  constructor() { }
  setStatus( status : status ) : void {
    this.loginStatus = status;
  }
  showStatus() : status {
    return this.loginStatus;
  }
}
