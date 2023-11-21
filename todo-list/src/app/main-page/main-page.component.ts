import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class MainPageComponent implements OnInit {
  displayedColumns: string[] = ['position', 'theme', 'description', 'author', 'date_creation', 'date_completed', 'changes'];

  constructor() { }

  ngOnInit() {
  }

}
