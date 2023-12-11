import { ChangeDetectorRef, Component, OnInit, effect } from '@angular/core';
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
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { Router } from '@angular/router';

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


  displayedColumns: string[] = ['position', 'theme', 'description','priority','category','author', 'date_creation', 'date_completed', 'actions'];
  noteSource: any[] =[];
  sortPriority: boolean = false;
  sortCategory: boolean = false;
  sortDateCompleted: boolean = false;
  sortDateCreated: boolean = false;

  constructor(private dataService: DateService, private dialog: MatDialog, private cd:ChangeDetectorRef, private router:Router) {
   
   }

   ngOnInit() {
    this.dataService.getUserId().subscribe((userId) => {
      if (userId !== null) {
        this.dataService.isLoggedIn.set(true) ;
        this.user =  userId;
        setTimeout(() => {
          this.loadNotes(this.user); 
        });

      } else {
        this.dataService.isLoggedIn.set(false);
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
      width: '30%',
      data: currentUser 
    }); 

    dialogRef.afterClosed().subscribe((result) =>{
      if(result =='logout'){
        window.location.reload();
      }}
    );

  } 
  
  getCurrentUserFromLocalStorage(userId: any): any {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    console.log(userId)
    return storedUsers.find((user: any) => user.id === userId) || {};
  }

  getCurrentNodeFromLocalStorage(nodeId: any): any {
    const storedNode = JSON.parse(localStorage.getItem('notes') || '[]');
    console.log(nodeId)
    return storedNode.find((nodeStorage: any) => nodeStorage.id === nodeId) || {};
  }
  

  loadNotes(user: any) { 
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]'); 
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]'); 


    const currentUserNotes = storedNotes
      .filter((note: Note) => note.author === user) 
      .map((note: Note) => { 
          const author = storedUsers.find((storedUser: any) => storedUser.id === note.author); 
          const authorName = author ? author.name : 'Неизвестен';  
          return { 
            ...note, 
            author: authorName, 
          }; 
      });

    this.noteSource = currentUserNotes; 
}
  
  deleteNote(id: string){ 
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]'); 
    const message = `Вы уверены?`;     
    const dialogData = new ConfirmDialogModel("Удалить запись", message); 
 
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { 
      maxWidth: "600px", 
      data: dialogData 
    }); 
 
    dialogRef.afterClosed().subscribe((dialogResult) => { 
     if(dialogResult == true){ 
      const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]'); 
      const currentNote = storedNotes.findIndex((note: any) => note.id === id); 
      if(currentNote !== -1){ 
        storedNotes.splice(currentNote,1); 
        localStorage.setItem('notes',JSON.stringify(storedNotes)); 
        window.location.reload(); 
      } 
     } 
    }); 
  }

  editNote(id: string){
    const currentNote = this.getCurrentNodeFromLocalStorage(id);
    const dialogRef = this.dialog.open(EditNoteDialogComponent, { 
      maxWidth: "550px",
      data: currentNote
    }); 

    dialogRef.afterClosed().subscribe(() =>{
      window.location.reload();}
    );

  }

  toggleSortNotesPriority(){
    if (!this.sortPriority) {
      this.noteSource = [...this.noteSource].sort((a, b) => a.priority.localeCompare(b.priority));
    } else {
      this.noteSource = [...this.noteSource].reverse();
    }
    this.sortPriority = !this.sortPriority;
  }

  toggleSortNotesCategory(){
    if (!this.sortCategory) {
      this.noteSource = [...this.noteSource].sort((a, b) => a.category.localeCompare(b.category));
    } else {
      this.noteSource = [...this.noteSource].reverse();
    }
    this.sortCategory = !this.sortCategory;
  }

  toggleSortNotesDateCreate(){
    if (!this.sortDateCreated) {
      this.noteSource = [...this.noteSource].sort((a, b) => new Date(a.date_creation).getDate() - new Date(b.date_creation).getDate());
    } else {
      this.noteSource = [...this.noteSource].reverse();
    }
    this.sortDateCreated = !this.sortDateCreated;
  }

  toggleSortNotesDateComplete(){
    if (!this.sortDateCompleted) {
      this.noteSource = [...this.noteSource].sort((a, b) => new Date(a.date_completed).getDate() - new Date(b.date_completed).getDate());
    } else {
      this.noteSource = [...this.noteSource].reverse();
    }
    this.sortDateCompleted = !this.sortDateCompleted;
  }




}
