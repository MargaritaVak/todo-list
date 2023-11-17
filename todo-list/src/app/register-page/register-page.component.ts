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
    CommonModule],
})
export class RegisterPageComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private authService: AuthorizationService) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });}

  ngOnInit() {
    this.authService.getUsers().subscribe(
      (res) => {
        console.log('Полученные пользователи:', res);
      }
    );    
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      console.log(userData);
      this.authService.registerUser(userData)
          console.log('Пользователь успешно зарегистрирован:', userData);
    } else {
      console.log('Форма заполнена некорректно. Пожалуйста, проверьте данные.');
    }
  }

}
