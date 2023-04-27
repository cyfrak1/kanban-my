import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  email : FormControl = new FormControl('', [Validators.required, Validators.email]);
  password : FormControl = new FormControl('', [Validators.required, Validators.min(5)]);
  hide : boolean = true;
  loginError : boolean = false;

  constructor( private router : Router, private loginService : LoginService, private authGuard : AuthGuardGuard) { }

  ngOnInit(): void {
  }

  getErrorMessage(formControlName : string) : string {
    const currentControl = eval(`this.${formControlName}`);
    if (currentControl.hasError('required')) {
      return 'To pole jest wymagane';
    }
    return currentControl.hasError('email') ? 'Niepoprawny email' : '';
  }
  checkData() : void {
    if(this.email.valid && this.password.valid){
      this.loginService.login(this.email.value,this.password.value).subscribe((res : boolean)=>{
        if(res){
          this.authGuard.isActive = true;
          this.router.navigate(['/dashboard']);
        }
        else{
          this.authGuard.isActive = false;
          this.loginError = true;
        }
      })
    }
    else{
      this.email.markAsTouched();
      this.password.markAsTouched();
    }
  }
}
