import { Component, OnInit, Inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateService } from '../services/date.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class ProfileComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: User,
    private dialogRef: MatDialogRef<ProfileComponent>,
    private dataService: DateService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLogoutClick() {
    this.dialogRef.close('logout');
    this.dataService.clearUserId();
    this.router.navigate(['/']);
  }
}
