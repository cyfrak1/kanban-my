import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatusService } from '../auth-status/auth-status.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authStatus : AuthStatusService, private router : Router) { }

  canActivate() : boolean {
    if(this.authStatus.showStatus() == "OK"){
      this.router.navigate(['/dashboard']);
      return true
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
