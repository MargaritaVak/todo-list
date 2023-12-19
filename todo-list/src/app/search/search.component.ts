import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Note } from '../interfaces/note';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Input() dataSourse!: MatTableDataSource<any>;
  @Output() filteredData: EventEmitter<MatTableDataSource<any>> =
    new EventEmitter<MatTableDataSource<any>>();

  @ViewChild('inputTheme') inputTheme!: ElementRef;
  @ViewChild('inputDescription') inputDescription!: ElementRef;
  @ViewChild('inputPriority') inputPriority!: ElementRef;
  @ViewChild('inputCategory') inputCategory!: ElementRef;
  @ViewChild('inputCreation') inputCreation!: ElementRef;
  @ViewChild('inputCompleted') inputCompleted!: ElementRef;
  @ViewChild('inputAuthor') inputAuthor!: ElementRef;

  applyFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filter = filterValue.trim().toLowerCase();

    switch (column) {
      case 'theme':
        this.dataSourse.filterPredicate = (data: Note, filter: string) =>
          data.theme.toLowerCase().includes(filter);
        break;
      case 'description':
        this.dataSourse.filterPredicate = (data: Note, filter: string) =>
          data.description.toLowerCase().includes(filter);
        break;
      case 'date_creation':
        this.dataSourse.filterPredicate = (data: Note, filter: string) =>
          data.date_creation.toString().toLowerCase().includes(filter);
        break;
      case 'date_completed':
        this.dataSourse.filterPredicate = (data: Note, filter: string) =>
          data.date_completed.toString().toLowerCase().includes(filter);
        break;
      case 'author':
        this.dataSourse.filterPredicate = (data: Note, filter: string) =>
          data.author.toLowerCase().includes(filter);
        break;
      case 'priority':
        this.dataSourse.filterPredicate = (data: Note, filter: string) =>
          data.priority.toString().toLowerCase().includes(filter);
        break;
      case 'category':
        this.dataSourse.filterPredicate = (data: Note, filter: string) =>
          data.category.toLowerCase().includes(filter);
        break;
      default:
        break;
    }

    this.dataSourse.filter = filter;

    this.filteredData.emit(this.dataSourse);
  }

  clearFilters() {
    this.inputTheme.nativeElement.value = '';
    this.inputDescription.nativeElement.value = '';
    this.inputPriority.nativeElement.value = '';
    this.inputCategory.nativeElement.value = '';
    this.inputCreation.nativeElement.value = '';
    this.inputCompleted.nativeElement.value = '';
    this.inputAuthor.nativeElement.value = '';

    this.dataSourse.filter = '';
    this.filteredData.emit(this.dataSourse);
  }
}
