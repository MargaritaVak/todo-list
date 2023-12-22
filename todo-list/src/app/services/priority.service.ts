import { Injectable } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface Priority {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PriorityService {
  private priorities: Priority[] = [];

  constructor(private announcer: LiveAnnouncer) {
    this.loadPrioritiesFromLocalStorage();
  }

  getPriorities(): Priority[] {
    return this.priorities;
  }

  addPriority(name: string): void {
    const trimmedName = name.trim();
    if (trimmedName) {
      this.priorities.push({ name: trimmedName });
      this.savePrioritiesToLocalStorage();
    }
  }

  removePriority(priority: Priority): void {
    const index = this.priorities.indexOf(priority);
    if (index >= 0) {
      const removedPriority = this.priorities.splice(index, 1)[0];
      this.savePrioritiesToLocalStorage();
      this.announcer.announce(`Removed ${removedPriority.name}`);
    }
  }

  editPriority(priority: Priority, newName: string): void {
    const trimmedName = newName.trim();
    if (!trimmedName) {
      this.removePriority(priority);
      return;
    }

    const index = this.priorities.indexOf(priority);
    if (index >= 0) {
      this.priorities[index].name = trimmedName;
      this.savePrioritiesToLocalStorage();
    }
  }

  private savePrioritiesToLocalStorage(): void {
    localStorage.setItem('priorities', JSON.stringify(this.priorities));
  }

  private loadPrioritiesFromLocalStorage(): void {
    const storedPriorities = localStorage.getItem('priorities');
    if (storedPriorities) {
      this.priorities = JSON.parse(storedPriorities);
    }
  }
}
