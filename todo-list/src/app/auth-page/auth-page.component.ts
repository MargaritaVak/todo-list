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

  constructor(private authService: AuthorizationService, private router: Router) {
    this.authForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });}

  ngOnInit() {
  }

  onSubmit() {
    if (this.authForm.valid) {
      const userData = this.authForm.value;
      console.log(userData);
      this.authService.authorizeUser(userData.login, userData.password)
          console.log('Вошёл:', userData.login);
          this.router.navigate(['/list']);
    } else {
      console.log('Форма заполнена некорректно. Пожалуйста, проверьте данные.');
    }
  }

}
