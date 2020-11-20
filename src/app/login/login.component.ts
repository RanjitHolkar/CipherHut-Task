import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EncryptDecryptService } from '../services/Encrypt-decrypt/encrypt-decrypt.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  submitted = false;
  message:string = '';
  usersList=[];
  today= new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private encryptDecryptService:EncryptDecryptService,
    private sharedService:SharedService) {
    this.checkLogin();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    // check form is valid or not
    if(this.loginForm.valid) {
      this.sharedService.spinner.next({status:true});
      let loginData = this.loginForm.value;
      if(environment.email == loginData.email && environment.password == loginData.password ) {
        let jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
        let encrypt = this.encryptDecryptService.encrypt(loginData.email);
        sessionStorage.setItem('currentUser',encrypt);
        sessionStorage.setItem('empUserTime',jstoday);
        this.sharedService.toasterMessage.next({status:'success',message:'Login Successfully'});
        this.router.navigate(['/dashboard']);
      } else {
        this.sharedService.toasterMessage.next({status:'error',message:'Invalid Credentials'});
      }
      this.sharedService.spinner.next({status:false});
    }
  }

  /* chaeck Login */
  checkLogin() {
    let token = sessionStorage.getItem('currentUser');

    if(token != null) {
      console.log(token);
      let decryptString = this.encryptDecryptService.decrypt(token);
      if(decryptString) {
        this.router.navigate(['/dashboard']);
      } else {
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('empUserTime');
      }
    }
  }

}
