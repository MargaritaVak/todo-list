import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { DateService } from '../services/date.service';

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
  isLoggedIn = false;
  displayedColumns: string[] = ['position', 'theme', 'description', 'author', 'date_creation', 'date_completed', 'changes'];

  constructor(private dataService: DateService) {
    

   }

  ngOnInit() {
    this.dataService.getUserId().subscribe((userId) => {
      if (userId !== null) {
        console.log(userId); 
      } else {
        console.log('err')
      }
    });
  }

}
