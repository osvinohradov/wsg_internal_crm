import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'service-popup-ref',
  templateUrl: './servicePopup.component.html',
  styleUrls: ['./servicePopup.component.css', './../service/service.component.css']

  //  styleUrls: ['./invoicePopup.component.css', './../invoice/invoice.component.css']

})
export class ServicePopupReferencesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ServicePopupReferencesComponent>) { }

  ngOnInit() {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
