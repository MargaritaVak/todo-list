import { Injectable } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface Category {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];

  constructor(private announcer: LiveAnnouncer) {
    this.loadCategoriesFromLocalStorage();
  }

  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(name: string): void {
    const trimmedName = name.trim();
    if (trimmedName) {
      this.categories.push({ name: trimmedName });
      this.saveCategoriesToLocalStorage();
    }
  }

  removeCategory(category: Category): void {
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      const removedCategory = this.categories.splice(index, 1)[0];
      this.saveCategoriesToLocalStorage();
      this.announcer.announce(`Removed ${removedCategory.name}`);
    }
  }

  editCategory(category: Category, newName: string): void {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      this.removeCategory(category);
      return;
    }

    const index = this.categories.indexOf(category);
    if (index >= 0) {
      this.categories[index].name = trimmedName;
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
