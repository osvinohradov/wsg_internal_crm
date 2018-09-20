import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'individual-counterparties-popup-ref',
  templateUrl: './individualCounterpartiesPopup.component.html',
  styleUrls: ['./individualCounterpartiesPopup.component.css', './../individualCounterparties/individualCounterparties.component.css']

})
export class IndividualCounterpartiesPopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<IndividualCounterpartiesPopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
