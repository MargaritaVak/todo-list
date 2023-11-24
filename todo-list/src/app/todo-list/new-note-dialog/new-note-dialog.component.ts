import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainPageComponent } from '../main-page/main-page.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Note } from '../../interfaces/note';


@Component({
  selector: 'app-new-note-dialog',
  templateUrl: './new-note-dialog.component.html',
  styleUrls: ['./new-note-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule,
     ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class NewNoteDialogComponent implements OnInit {
  noteForm: FormGroup;

  constructor() {
    this.noteForm = new FormGroup({
      theme: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      date_creation: new FormControl('', [Validators.required]),
      date_completed: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required])
});}

  ngOnInit(): void {
    
  }


  onSubmit() {
    if (this.noteForm.valid) {
      const formData = this.noteForm.value;
      console.log('Создано: ', formData);
    }
  }
}
