import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';

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
    MatListModule,],
})
export class AuthPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
