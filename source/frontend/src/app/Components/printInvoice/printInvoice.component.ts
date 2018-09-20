import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'avia-print-invoice-popup',
  templateUrl: './printInvoice.component.html',
  styleUrls: ['./printInvoice.component.css' ]
})
export class AviaPrintInvoicePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AviaPrintInvoicePopupComponent>
  ) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
