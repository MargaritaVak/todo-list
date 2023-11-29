import { Component, OnInit, Inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,
     MatInputModule,
     MatButtonModule],
})
export class ProfileComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public userData:any,  private dialogRef: MatDialogRef<ProfileComponent>) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.dialogRef.close('logout')
  }

}
