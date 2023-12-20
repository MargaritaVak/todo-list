import { Component, inject } from '@angular/core';
import {ENTER} from '@angular/cdk/keycodes';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';

export default interface Category {
  name: string;
}

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,
     MatInputModule,
     MatDialogModule,
     CommonModule,
     FormsModule,
     MatChipsModule,
     MatIconModule,
     MatButtonModule],
})
export class CategoryDialogComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;
  categories: Category[] = [];

  announcer = inject(LiveAnnouncer);

  constructor(){
    this.loadCategoriesFromLocalStorage();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.categories.push({ name: value });
      this.saveCategoriesToLocalStorage();
    }
    event.chipInput!.clear();
  }

  remove(category: Category): void {
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      this.categories.splice(index, 1);
      this.saveCategoriesToLocalStorage();
      this.announcer.announce(`Removed ${category.name}`);
    }
  }

  edit(category: Category, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(category);
      return;
    }
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      this.categories[index].name = value;
      this.saveCategoriesToLocalStorage();
    }
  }

  private saveCategoriesToLocalStorage(): void {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  private loadCategoriesFromLocalStorage(): void {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    }
  }
}
