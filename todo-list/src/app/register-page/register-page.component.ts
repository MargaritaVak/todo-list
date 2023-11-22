import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization.service';
import { Router, ActivatedRoute} from '@angular/router';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule,
    RouterLink,
    MatButtonModule, 
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    CommonModule,],
})
export class RegisterPageComponent implements OnInit {
  registrationForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;


  constructor(private authService: AuthorizationService, private router: Router, private dataService: DateService) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });}

  ngOnInit() {
  
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      console.log(userData);
      this.authService.registerUser(userData).subscribe({
        next: (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.authService.authorizeUser(userData.login, userData.password).subscribe(
            (data) => {
              this.dataService.setUserId(data); 
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.router.navigate(['/']);
            },
            (err) => {
              this.errorMessage = err.error.message;
              console.log(err);
              this.isLoginFailed = true;
            }
          );
          
        },
        error: (err) => {
            this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        },
      });
  }}

}
