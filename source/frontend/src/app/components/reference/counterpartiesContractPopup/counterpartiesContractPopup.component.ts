import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'counterparties-contract-popup-ref',
  templateUrl: './counterpartiesContractPopup.component.html',
  styleUrls: ['./counterpartiesContractPopup.component.css', './../counterpartiesContract/counterpartiesContract.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class CounterpartiesContractPopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CounterpartiesContractPopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
