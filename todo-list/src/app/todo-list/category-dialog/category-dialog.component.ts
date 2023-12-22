import { Component } from '@angular/core';
import {ENTER} from '@angular/cdk/keycodes';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Category, CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class CategoryDialogComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;

  constructor(
    private categoryService: CategoryService,
  ) {}

  get categories(): Category[] {
    return this.categoryService.getCategories();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.categoryService.addCategory(value);
    }
    event.chipInput!.clear();
  }

  remove(category: Category): void {
    this.categoryService.removeCategory(category);
  }

  edit(category: Category, newValue: string): void {
    this.categoryService.editCategory(category, newValue);
  }
}
