import { Component,inject } from '@angular/core';
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
import { Priority, PriorityService } from '../../services/priority.service';



@Component({
  selector: 'app-priority-dialog',
  templateUrl: './priority-dialog.component.html',
  styleUrls: ['./priority-dialog.component.scss'],
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
export class PriorityDialogComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;

  constructor(private priorityService: PriorityService) {}

  get priorities(): Priority[] {
    return this.priorityService.getPriorities();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.priorityService.addPriority(value);
    }
    event.chipInput!.clear();
  }

  remove(priority: Priority): void {
    this.priorityService.removePriority(priority);
  }

  edit(priority: Priority, newValue: string): void {
    this.priorityService.editPriority(priority, newValue);
  }
}
