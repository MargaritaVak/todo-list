import { Component, OnDestroy} from '@angular/core';
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
import { Router} from '@angular/router';
import { DateService } from '../services/date.service';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class RegisterPageComponent implements OnDestroy{
  private authorizationSub: Subscription | undefined;
  private registrationSub: Subscription | undefined;

  registrationForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage: string | null = null;

  isLoginFailed = false;

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private dataService: DateService
  ) {
    this.registrationForm = new FormGroup<User>({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      login: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*\\d).+$'),
      ]),
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.registrationSub = this.authService.registerUser(userData).subscribe({
        next: () => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.authorizationSub = this.authService
            .authorizeUser(userData.login, userData.password)
            .subscribe({
              next: (data) => {
                this.dataService.setUserId(data.user);
                this.isLoginFailed = false;
                this.dataService.isLoggedIn.set(true);
                this.router.navigate(['/main']);
              },
              error: (err) => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
              },
            });
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
    }
  }

  ngOnDestroy(){
    if(this.registrationSub){
      this.registrationSub.unsubscribe();
    }
    if (this.authorizationSub) {
      this.authorizationSub.unsubscribe();
    }

  }
}
