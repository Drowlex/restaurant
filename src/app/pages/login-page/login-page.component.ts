import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
/**
 * Login component
 */
export class LoginPageComponent implements OnInit {
	session     : boolean  = false;
	see_pass    : boolean  = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  submitted  : boolean   = false;
  error      : string    = '';
  errorDetail: string    = '';

  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder  : FormBuilder, 
    private cookieService: CookieService,
    private spinner      : NgxSpinnerService,
    private router       : Router, 
    private authService  : AuthService
  ) { }

  ngOnInit() {
    this.initLoginForm();
    this.getSessionCookie();
    this.getSourceSessionCookie();    
  }
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['user', [Validators.required]],
      password: ['root', [Validators.required]],
    });
  }
  getSessionCookie() {		
    let remember = this.cookieService.get('session');
    this.session = (remember == '1') ? true : false;
  }
  
  getSourceSessionCookie(): void {
    let username    = atob(this.cookieService.get('session-username'));
    let password = atob(this.cookieService.get('session-password'));
    this.f['username'].setValue(username);
    this.f['password'].setValue(password);
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // convenience getter for easy access to form fields

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.spinner.show();

      this.authService.login(this.f['username'].value, this.f['password'].value)
        .pipe(finalize(()=>this.spinner.hide()))
        .subscribe({
          next:(result) => {
            if (result) {
              this.saveUserInCookies();
              this.router.navigate(['/home']);
            } else {
              this.error = 'Usuario Invalido';
              this.errorDetail = 'Verifique sus datos con el administrador del sistema';
            }
          },
          error: (error) => {
            console.log(error)
            this.error = error ? error.hint : '';
            this.errorDetail = error ? error.message : '';
          }
        });
    }
  }
  saveUserInCookies() {
    let dateCurrent   = new Date();
    let daysOfStorage = 365;
    let dateExpanded  = dateCurrent.setDate(dateCurrent.getDate() + daysOfStorage);
    let expirateDate  = new Date(dateExpanded);

    if (this.session) {
      this.cookieService.set('session','1', { expires: expirateDate });
      let username = btoa(this.f['username'].value);
      let password = btoa(this.f['password'].value);
      this.cookieService.set('session-username',username,{ expires: expirateDate });
      this.cookieService.set('session-password',password, { expires: expirateDate });
    } else {
      this.cookieService.set('session','0', { expires: expirateDate });
      this.cookieService.delete('session-username');
      this.cookieService.delete('session-password');
    }
  }
}
