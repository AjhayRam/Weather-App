import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide = true;
  public loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private router:Router, private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:[''],
    })
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  login(){
    this.http.get<any>("http://localhost:3000/signupUser")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if (user){
        this._snackBar.open('Login Success!', 'Close', {
          duration: 10000,
        });
        this.loginForm.reset()
        this.router.navigate(['home'])
      }
      else{
        this._snackBar.open('Invalid Credentials!', 'Close', {
          duration: 10000,
        });
      }
    },err =>{
      this._snackBar.open('Login Failed...', 'Close', {
        duration: 10000,
      });
    })
  }

  getEmailErrors() {
    if (this.Email.hasError('required')) return 'Email is required!';
    if (this.Email.hasError('email')) return 'Email is invalid.';
    return '';
  }

  getPasswordErrors() {
    if (this.PWD.hasError('required')) return 'Password is required!';
    if (this.PWD.hasError('minlength'))
      return 'Minimum 8 characters are required!';
    if (this.PWD.hasError('maxlength'))
      return 'Maximum 15 characters are required!';
    return '';
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
 
}

