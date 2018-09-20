import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'avia-group-invoice-popup',
  templateUrl: './groupInvoicePopup.component.html',
  styleUrls: ['./../groupInvoice/groupInvoice.component.css', './groupInvoicePopup.component.css']
})
export class AviaGroupInvoicePopupComponent implements OnInit {

  public currency: Array<Object> = [
    { value: 'currency-1', viewValue: 'грн' },
    { value: 'currency-2', viewValue: '$' },
    { value: 'currency-3', viewValue: 'euro' }
  ];

  constructor(
    public dialogRef: MatDialogRef<AviaGroupInvoicePopupComponent>
  ) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }
} 
