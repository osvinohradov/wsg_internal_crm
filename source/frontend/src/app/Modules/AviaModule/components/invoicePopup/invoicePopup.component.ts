import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-invoice-popup',
  templateUrl: './invoicePopup.component.html',
  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']
})
export class AviaInvoicePopupComponent implements OnInit {

  public currency: Array<Object> = [
    {value: 'currency-1', viewValue: 'Готівка'},
    {value: 'currency-2', viewValue: 'Кредитна картка'},
    {value: 'currency-3', viewValue: 'Банкiвськiй кредит'}
  ];

  public currencyProposal: Array<Object> = [
    {value: 'currency-4', viewValue: 'грн'},
    {value: 'currency-5', viewValue: '$'},
    {value: 'currency-6', viewValue: 'euro'}
  ];

  public currencyFinal: Array<Object> = [
    {value: 'currency-4', viewValue: 'грн'},
    {value: 'currency-5', viewValue: '$'},
    {value: 'currency-6', viewValue: 'euro'}
  ];

  public currencyExchange: Array<Object> = [
    {value: 'currency-4', viewValue: 'NBU'},
    {value: 'currency-5', viewValue: 'currency exchange1'},
    {value: 'currency-6', viewValue: 'currency exchange2'}
  ];

  public supplierCost: Array<Object> = [
    {value: 'currency-4', viewValue: 'грн'},
    {value: 'currency-5', viewValue: '$'},
    {value: 'currency-6', viewValue: 'euro'}
  ];

  
  constructor(public dialogRef: MatDialogRef<AviaInvoicePopupComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
