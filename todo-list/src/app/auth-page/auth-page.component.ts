import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization.service';
import { Router} from '@angular/router';
import { DateService } from '../services/date.service';
import { CommonModule } from '@angular/common';
import { Login } from '../interfaces/login';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    CommonModule ],
})
export class AuthPageComponent implements OnInit {
  authForm: FormGroup;
  isLoginFailed = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthorizationService, private router: Router, private dataService: DateService) {
    this.authForm = new FormGroup<Login>({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });}

  ngOnInit() {

  }

  onSubmit() {
    if (this.authForm.valid) {
      const userData = this.authForm.value;
      this.authService.authorizeUser(userData.login, userData.password).subscribe(
        (data) => {
          this.dataService.setUserId(data.user);
              this.isLoginFailed = false;
              this.dataService.isLoggedIn.set(true);
              this.router.navigate(['/main']);
        },
        (err) => {
          this.errorMessage = err;
          this.isLoginFailed = true;
          console.error(this.errorMessage)
        }
      );
    } else {
      this.isLoginFailed = true;
      console.error('Ошибка авторизации');
    }
  }

}
