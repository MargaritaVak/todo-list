import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { DateService } from '../services/date.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule
  ]
})
export class MainPageComponent implements OnInit {
  isLoggedIn = false;
  displayedColumns: string[] = ['position', 'theme', 'description', 'author', 'date_creation', 'date_completed', 'changes'];

  constructor(private dataService: DateService) {
    

   }

  ngOnInit() {
    this.dataService.getUserId().subscribe((userId) => {
      if (userId !== null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }



}
