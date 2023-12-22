import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { DateService } from '../../services/date.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
} from '@angular/material/dialog';
import { NewNoteDialogComponent } from '../new-note-dialog/new-note-dialog.component';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { PriorityDialogComponent } from '../priority-dialog/priority-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { Note } from '../../interfaces/note';
import { ProfileComponent } from '../../profile/profile.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SearchComponent } from "../../search/search.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { EditUser } from '../../interfaces/edit-user';

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
    MatIconModule,
    MatSortModule,
    SearchComponent,
    MatExpansionModule,
  ],
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {
  user!: string;

  private dataServiceSub: Subscription | undefined;
  private dialogRefSub: Subscription | undefined;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'check_result',
    'position',
    'theme',
    'description',
    'priority',
    'category',
    'author',
    'date_creation',
    'date_completed',
    'actions',
  ];
  noteSource!: MatTableDataSource<Note>;

  panelFilterOpenState = false;

  constructor(public dataService: DateService, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.dataServiceSub = this.dataService.getUserId().subscribe((userId) => {
      if (userId !== null) {
        this.dataService.isLoggedIn.set(true);
        this.user = userId;
        setTimeout(() => {
          this.loadNotes(this.user);
        }, 1000);
      } else {
        this.dataService.isLoggedIn.set(false);
      }
    });
  }

  ngAfterViewInit() {
    this.initializeDataSource();
  }

  toggleDescription(id: string): void {
    const index = this.noteSource.data.findIndex(
      (note: Note) => note.id === id
    );
    if (index !== -1) {
      this.noteSource.data[index].expanded =
        !this.noteSource.data[index].expanded;
    }
  }

  toggleCompletion(id: string): void {
    const index = this.noteSource.data.findIndex(
      (note: Note) => note.id === id
    );
    if (index !== -1) {
      this.noteSource.data[index].check_result =
        !this.noteSource.data[index].check_result;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewNoteDialogComponent, {
      data: this.user,
    });

    this.dialogRefSub = dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
    });
  }

  openPriorityDialog() {
    const dialogRef = this.dialog.open(PriorityDialogComponent, {
      width: '400px',
    });
  }
  openProfileDialog() {
    const currentUser = this.getCurrentUserFromLocalStorage(this.user);
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '30%',
      data: currentUser,
    });
  }

  getCurrentUserFromLocalStorage(userId: string): EditUser {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    return storedUsers.find((user: EditUser) => user.id === userId) || {};
  }

  getCurrentNodeFromLocalStorage(nodeId: string): Note {
    const storedNode = JSON.parse(localStorage.getItem('notes') || '[]');
    return (
      storedNode.find((nodeStorage: Note) => nodeStorage.id === nodeId) || {}
    );
  }

  loadNotes(user: string) {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    const currentUserNotes = storedNotes
      .filter((note: Note) => note.author === user)
      .map((note: Note) => {
        const author = storedUsers.find(
          (storedUser: EditUser) => storedUser.id === note.author
        );
        const authorName = author ? author.name : 'Неизвестен';
        return {
          ...note,
          author: authorName,
        };
      });

    this.noteSource = new MatTableDataSource(currentUserNotes);
    this.initializeDataSource();
  }

  deleteNote(id: string) {
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const message = `Вы уверены?`;
    const dialogData = new ConfirmDialogModel('Удалить запись', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    this.dialogRefSub = dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult == true) {
        const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        const currentNote = storedNotes.findIndex(
          (note: Note) => note.id === id
        );
        if (currentNote !== -1) {
          storedNotes.splice(currentNote, 1);
          localStorage.setItem('notes', JSON.stringify(storedNotes));
          window.location.reload();
        }
      }
    });
  }

  editNote(id: string) {
    const currentNote = this.getCurrentNodeFromLocalStorage(id);
    const dialogRef = this.dialog.open(EditNoteDialogComponent, {
      maxWidth: '550px',
      data: currentNote,
    });

    this.dialogRefSub = dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  initializeDataSource() {
    if (this.noteSource) {
      this.noteSource.sort = this.sort;
    }
  }

  receiveFilteredData(filteredData: MatTableDataSource<Note>) {
    this.noteSource = filteredData;
  }

  ngOnDestroy(): void {
    if(this.dataServiceSub){
      this.dataServiceSub.unsubscribe();
    }

    if (this.dialogRefSub) {
      this.dialogRefSub.unsubscribe();
    }
  }
}
