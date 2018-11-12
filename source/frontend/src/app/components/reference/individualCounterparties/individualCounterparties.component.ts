import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { IndividualCounterpartiesPopupReferencesComponent } from './../individualCounterpartiesPopup/individualCounterpartiesPopup.component';

@Component({
  selector: 'individual-counterparties-ref',
  templateUrl: './individualCounterparties.component.html',
  styleUrls: ['./individualCounterparties.component.css']
})
export class IndividualCounterpartiesReferencesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(IndividualCounterpartiesPopupReferencesComponent, {
      width: '98%',
      height: '90vh'
    });

  }
}
