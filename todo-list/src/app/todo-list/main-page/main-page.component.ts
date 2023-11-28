import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { DateService } from '../../services/date.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { NewNoteDialogComponent } from '../new-note-dialog/new-note-dialog.component';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { PriorityDialogComponent } from '../priority-dialog/priority-dialog.component';

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
  user!: string;
  isLoggedIn = false;
  displayedColumns: string[] = ['position', 'theme', 'description', 'author', 'date_creation', 'date_completed', 'changes'];

  constructor(private dataService: DateService, private dialog: MatDialog) {
    

   }

  ngOnInit() {
    this.dataService.getUserId().subscribe((userId) => {
      if (userId !== null) {
        this.isLoggedIn = true;
        this.user = userId;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      data: this.user
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openPriorityDialog() {
    const dialogRef = this.dialog.open(PriorityDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
