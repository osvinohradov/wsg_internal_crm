import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'currency-exchange-popup-ref',
  templateUrl: './currencyExchangePopup.component.html',
  styleUrls: ['./currencyExchangePopup.component.css', './../currencyExchange/currencyExchange.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class CurrencyExchangePopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CurrencyExchangePopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
