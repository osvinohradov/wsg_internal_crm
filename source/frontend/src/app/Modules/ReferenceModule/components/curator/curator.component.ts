import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CuratorPopupReferencesComponent } from './../curatorPopup/curatorPopup.component';

@Component({
  selector: 'curator-ref',
  templateUrl: './curator.component.html',
  styleUrls: ['./curator.component.css']
})
export class CuratorReferencesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CuratorPopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: '90vh'
    });

  }
}
