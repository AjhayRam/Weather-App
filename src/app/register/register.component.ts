import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup,  Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  hide = true;
  public registerForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router:Router,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:[''],
      rpassword:[''],
      
    }),
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ]
    });
  }
  register(){
    this.http.post<any>("http://localhost:3000/signupUser",this.registerForm.value)
    .subscribe(res=>{
      this._snackBar.open('Signup Successfull!', 'Close', {
        duration: 10000,
      });
      this.registerForm.reset();
      this.router.navigate(['login']);
    },err=>{
      this._snackBar.open('Signup Failed!', 'Close', {
        duration: 10000,
      });
    })
  }

  getFirstNameErrors() {
    if (this.FirstName.hasError('required')) return 'Field is requied!';
    return '';
  }
  getLastNameErrors() {
    if (this.LastName.hasError('required')) return 'Field is requied!';
    return '';
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
    return this.registerForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get FirstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }

}


