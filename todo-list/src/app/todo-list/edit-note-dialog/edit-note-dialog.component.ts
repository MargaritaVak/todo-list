import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import Category from '../category-dialog/category-dialog.component';
import Priority from '../priority-dialog/priority-dialog.component';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,
     MatInputModule,
     MatButtonModule,
     MatSelectModule,
     MatDialogModule],
})
export class EditNoteDialogComponent implements OnInit {

  categories: Category[] = [];
  priorities: Priority[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public noteData:any,  private dialogRef: MatDialogRef<EditNoteDialogComponent>) { 
    
  }

  ngOnInit() {
    this.loadFromLocalStorage()
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
