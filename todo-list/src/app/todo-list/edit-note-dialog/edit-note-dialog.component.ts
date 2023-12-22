import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA,} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule} from '@angular/material/dialog';
import Priority from '../priority-dialog/priority-dialog.component';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../config/date.adapter';
import { EditNote } from '../../interfaces/edit-note';
import { Note } from '../../interfaces/note';
import { Category } from '../../services/category.service';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-Ru' },
  ],
})
export class EditNoteDialogComponent implements OnInit {
  categories: Category[] = [];
  priorities: Priority[] = [];
  noteForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public noteData: Note,
    private fb: FormBuilder
  ) {
    this.noteForm = new FormGroup<EditNote>({
      theme: new FormControl(this.noteData.theme, [Validators.required]),
      date_completed: new FormControl(
        this.noteData.date_completed,
        Validators.required
      ),
      category: new FormControl(this.noteData.category, Validators.required),
      priority: new FormControl(this.noteData.priority, Validators.required),
      description: new FormControl(
        this.noteData.description,
        Validators.required
      ),
    });
  }

  ngOnInit() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedCategories = localStorage.getItem('categories');
    const storedPriorities = localStorage.getItem('priorities');

    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    }

    if (storedPriorities) {
      this.priorities = JSON.parse(storedPriorities);
    }
  }

  updateNote(): void {
    const notesFromLocalStorage: Note[] = JSON.parse(
      localStorage.getItem('notes') || '[]'
    );
    const currentDate = new Date().toISOString();

    const updatedNoteIndex = notesFromLocalStorage.findIndex(
      (note: Note) => note.id === this.noteData.id
    );

    if (updatedNoteIndex !== -1) {
      const updatedNote: Note = {
        ...notesFromLocalStorage[updatedNoteIndex],
        theme: this.noteForm.value.theme,
        date_completed: this.noteForm.value.date_completed,
        category: this.noteForm.value.category,
        priority: this.noteForm.value.priority,
        description: this.noteForm.value.description,
        date_creation: currentDate,
      };

      notesFromLocalStorage[updatedNoteIndex] = updatedNote;
      localStorage.setItem('notes', JSON.stringify(notesFromLocalStorage));
    }
  }
}
