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
import { Router, ActivatedRoute} from '@angular/router';
import { DateService } from '../services/date.service';

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
    ReactiveFormsModule],
})
export class AuthPageComponent implements OnInit {
  authForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthorizationService, private router: Router, private dataService: DateService) {
    this.authForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });}

  ngOnInit() {

  }

  onSubmit() {
    if (this.authForm.valid) {
      const userData = this.authForm.value;
      this.authService.authorizeUser(userData.login, userData.password).subscribe(
        (data) => {
          this.dataService.setUserId(data); 
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.router.navigate(['/']);
  
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    } else {
      console.log('Форма заполнена некорректно. Пожалуйста, проверьте данные.');
    }
  }

}
