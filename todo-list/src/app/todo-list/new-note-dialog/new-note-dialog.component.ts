import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainPageComponent } from '../main-page/main-page.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Note } from '../../interfaces/note';
import {MatSelectModule} from '@angular/material/select';
import Category from '../category-dialog/category-dialog.component';
import Priority from '../priority-dialog/priority-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule,
     ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class NewNoteDialogComponent implements OnInit {
  noteForm: FormGroup;
  categories: Category[] = [];
  priorities: Priority[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private dialogRef: MatDialogRef<NewNoteDialogComponent>) {
    this.noteForm = new FormGroup({
      theme: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date_completed: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required])
});}

  ngOnInit(): void {
    this.loadFromLocalStorage()
  }


  onSubmit() {
    if (this.noteForm.valid) {
      const formData = this.noteForm.value;
      const userId = this.data.user;
      const currentDate = new Date().toISOString();

      const noteData = {
        ...formData,
        author: userId,
        date_creation: currentDate
      }
      let notes: any[] =JSON.parse(localStorage.getItem('notes') || '[]')
      notes.push(noteData);

      localStorage.setItem('notes',JSON.stringify(notes));

      console.log('Создано: ',noteData)
      this.dialogRef.close();
    }
    else{
      console.log(this.noteForm.valid)
      console.log(this.noteForm.errors)
    }

  }

  private loadFromLocalStorage(): void{
    const storedCategories = localStorage.getItem('categories');
    const storedPriorities = localStorage.getItem('priorities');

    if(storedCategories){
      this.categories = JSON.parse(storedCategories);
      console.log(this.categories)
    }

    if(storedPriorities){
      this.priorities = JSON.parse(storedPriorities);
    }
  }
}
