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
import {MatIconModule} from '@angular/material/icon';
import { Note } from '../../interfaces/note';
import { User } from '../../interfaces/user';
import { ProfileComponent } from '../../profile/profile.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatIconModule
  ]
})
export class MainPageComponent implements OnInit {
  user!: any;
  isLoggedIn = false;

  displayedColumns: string[] = ['position', 'theme', 'description','priority','category','author', 'date_creation', 'date_completed',];
  noteSource: any[] =[];

  constructor(private dataService: DateService, private dialog: MatDialog) {
   }

   ngOnInit() {
    this.dataService.getUserId().subscribe((userId) => {
      if (userId !== null) {
        this.isLoggedIn = true;
        this.user = userId;
        setTimeout(() => {
          this.loadNotes(); 
        });
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  
  toggleDescription(id: string): void {
    const index = this.noteSource.findIndex((note:Note) => note.id === id);
    if(index !== -1){
      this.noteSource[index].expanded = !this.noteSource[index].expanded;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(() =>{
      window.location.reload();}
    );

  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px'
    });
  }

  openPriorityDialog() {
    const dialogRef = this.dialog.open(PriorityDialogComponent, {
      width: '400px'
    });
  }
  openProfileDialog() { 
    const currentUser = this.getCurrentUserFromLocalStorage(this.user);
    const dialogRef = this.dialog.open(ProfileComponent, { 
      width: '60%',
      data: currentUser 
    }); 

    dialogRef.afterClosed().subscribe((result) =>{
      if(result =='logout'){
        this.dataService.clearUserId();
      }}
    );

  } 
  
  getCurrentUserFromLocalStorage(userId: any): any {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    console.log(userId)
    return storedUsers.find((user: any) => user.id === userId.user) || {};
  }
  

  loadNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUserNotes = storedNotes.map((note: Note) => {
      const author = storedUsers.find((user: any) => user.id === note.author);
      const authorName = author ? author.name : 'Неизвестен'; 
  
      return {
        ...note,
        author: authorName,
      };
    });
  
    this.noteSource = currentUserNotes;
  }
  

}
