import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LoginService } from 'src/app/core/services/loginService/login.service';
import { loginResInterface } from 'src/app/core/interfaces/loginResInterface';
import { Router } from '@angular/router';
import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';

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

  constructor(private loginService : LoginService, private router : Router, private authStatusService : AuthStatusService) { }

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
      this.loginService.login(this.email.value,this.password.value);
      this.loginService.loginResListener().subscribe((data : loginResInterface )=> {
        if(data.status == "OK"){
          this.router.navigate(['/dashboard']);
          this.authStatusService.setStatus(data.status);
        }
        else{
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
