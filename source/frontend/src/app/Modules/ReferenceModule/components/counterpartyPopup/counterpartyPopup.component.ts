import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'counterparty-popup-ref',
  templateUrl: './counterpartyPopup.component.html',
  styleUrls: ['./counterpartyPopup.component.css', './../counterparty/counterparty.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class CounterpartyPopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CounterpartyPopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
