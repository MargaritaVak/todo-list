import { Component,inject } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export default interface Priority {
  name: string;
}

@Component({
  selector: 'app-priority-dialog',
  templateUrl: './priority-dialog.component.html',
  styleUrls: ['./priority-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,
     MatInputModule,
     MatDialogModule,
     CommonModule, 
     FormsModule, 
     MatChipsModule, 
     MatIconModule],
})
export class PriorityDialogComponent{
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  priorities: Priority[] = [];

  announcer = inject(LiveAnnouncer);

  constructor(){
    this.loadPrioritiesFromLocalStorage();
  }

  add(event: MatChipInputEvent): void { 
    const value = (event.value || '').trim(); 
    if (value) { 
      this.priorities.push({ name: value }); 
      this.savePrioritiesToLocalStorage();
    } 
    event.chipInput!.clear(); 
  } 

  remove(priority: Priority): void { 
    const index = this.priorities.indexOf(priority); 
    if (index >= 0) { 
      this.priorities.splice(index, 1); 
      this.savePrioritiesToLocalStorage(); 
      this.announcer.announce(`Removed ${priority.name}`);
    } 
  } 

  edit(priority: Priority, event: MatChipEditedEvent) { 
    const value = event.value.trim(); 
    if (!value) { 
      this.remove(priority); 
      return; 
    } 
    const index = this.priorities.indexOf(priority); 
    if (index >= 0) { 
      this.priorities[index].name = value; 
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
