import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CurrencyExchangePopupReferencesComponent } from './../currencyExchangePopup/currencyExchangePopup.component';


@Component({
  selector: 'currency-exchange-ref',
  templateUrl: './currencyExchange.component.html',
  styleUrls: ['./currencyExchange.component.css']
})
export class CurrencyExchangeReferencesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CurrencyExchangePopupReferencesComponent, {
      panelClass: 'my-centered-dialog',
      width: '50%',
      height: '90vh'
    });

  }
}
